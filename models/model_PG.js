import pg from "pg";
import dotenv from "dotenv";
//import bcrypt from "bcrypt"


dotenv.config();

let generateBookingID=function(length=10){

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



 const pool = new pg.Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
     
    //  connectionString:process.env.URI,
    //  ssl:{
    //      rejectUnauthorized:false
    //  }
 })

async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}



async function findJourneyViaCities(begin,beginDate,end,endDate=0,callback){
    console.log(begin, beginDate, end, endDate);
    let iataBegin={text:`SELECT  "airportID" FROM "Airport" WHERE "City"=$1 ;`,values:[begin]};
    let iataEnd={text:`SELECT  "airportID" FROM "Airport" WHERE "City"=$1 ;`,values:[end]};
    //let flightInfoReturn={text:`SELECT "flightID","Company","Cost","departureTime","arrivalTime FROM "FlightLeg" 
    //WHERE "startAirportID"='$1',"finishAirportID"='$2',"departureDate">='$3'`,values:[iataEnd.airportID,iataBegin.airportID,//endDate]};
    try{
        const client= await connect();
        const res1= await client.query(iataBegin);
        //res1.rows[0].airportID
        const res2=await client.query(iataEnd);
        const airpt1 = res1.rows[0].airportID;
        const airpt2 = res2.rows[0].airportID;
        
        //response = await db.query('SELECT * FROM products WHERE city = $1 AND region = $2 AND country = $3', [city,region,country]);
        let flightInfo=`SELECT "flightID","Company","Cost","departureTime","arrivalTime" FROM "FlightLeg" WHERE "startAirportID"='${res1.rows[0].airportID}' AND "finishAirportID"='${res2.rows[0].airportID}' AND "departureDate"='${beginDate}';`;
        const flightRes=await client.query(flightInfo);
        flightRes.rows[0]["begin"] = airpt1;
        flightRes.rows[0]["end"] = airpt2;
        callback(null, [flightRes.rows, []])
    }catch(error){
        callback(null, error);
    }
}



// async function checkAdmin(ID, callback){
//     const sql={text: `SELECT * FROM "Admin" WHERE "adminID"=$1`, values:[ID]};
//     try{
//         const client=await connect();
//         const res=await client.query(sql);

//         callback(null, res.rows);

//     }catch(error){
//         callback(error,null);

//     }
// }
async function checkBookingID(bookingID,callback){
    console.log("Checking Booking Existence");
    const sql={text:`SELECT * FROM Booking WHERE "bookingID=$1"`,values:[bookingID]}
    try{
        const client =await connect();
        const res=await client.query(sql);
        let date=new Date();
        
        if(jQuery.isEmptyObject(res)){
            const action=await client.query(`INSERT INTO "Booking("bookingID","Date","Time") 
            VALUES('${bookingID}','${date.toLocaleTimeString}','${date.toLocaleTimeString}')"`);
            await client.release();
        }
        else{
            callback(null,row[0]);
            await client.release();
        }
    }catch(error){
        callback(null, error);
    }
}

async function findUser(Username, callback){
    console.log("HERE")
    const sql ={text: `SELECT * FROM "User" WHERE "Username"=$1`, values: [Username]} /*and "Password"='${Password}`*/;
    try{
        const client= await connect();
        const res= await client.query(sql);
        const sqlAdmin={text: `SELECT * FROM "Admin" WHERE "adminID"=$1`, values:[res.rows[0].ID]};
        const resAdmin = await client.query(sqlAdmin);
        res.rows.push(resAdmin.rows[0]);
        callback(null,res.rows);
        await client.release();

    }catch(error){
        callback(null, error);
    }

}

async function insertUser (ID,Fname,Mname,Lname,Email,Cellphone,Username, hashedPassword,NewsLetter, Salt, callback) {
    // εισαγωγή νέου χρήστη, και επιστροφή στο callback της νέας εγγραφής
    
    const sql = `INSERT INTO "User"("Fname","Mname","Lname","Email","Cellphone","Username","Password","NewsLetter","Salt") VALUES ('${Fname}','${Mname}','${Lname}','${Email}','${Cellphone}','${Username}','${hashedPassword}','${true}','${Salt}') RETURNING "ID";`
    console.log('to insert...', sql)
    // how to return the autoincremented value of an inserted record: https://stackoverflow.com/questions/37243698/how-can-i-find-the-last-insert-id-with-node-js-and-postgresql
    try {
        const client = await connect();
        const res = await client.query(sql);
        
        await client.release();
        console.log(`user inserted`);
        callback(null, [{"ID":res.rows[0].ID,"Fname": Fname,"Mname":Mname,"Lname":Lname,"Email":Email,"Cellphone":Cellphone,"Username":Username,"Password": hashedPassword,"NewsLetter":NewsLetter, "Salt": Salt }]); 
    } 
    catch (err) {
        console.log(err);
        callback(null, error);
        }
    }
  
async function insertTicket(callback){

}

export {generateBookingID,findUser, insertUser, findJourneyViaCities, checkBookingID};