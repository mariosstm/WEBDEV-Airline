import pg from "pg";
import dotenv from "dotenv";
//import bcrypt from "bcrypt"


dotenv.config();

 const pool = new pg.Pool({
     
        // user: process.env.PGUSER,
        // host: process.env.PGHOST,
        // database: process.env.PGDATABASE,
        // password: process.env.PGPASSWORD,
        // port: process.env.PORT
     
     connectionString:process.env.URI,
     ssl:{
         rejectUnauthorized:false
     }
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

async function findUser(Username, callback){
    const sql ={text: `SELECT * FROM "User" WHERE "Username"=$1`, values: [Username]} /*and "Password"='${Password}`*/;
    try{
        const client= await connect();
        const res= await client.query(sql);
        callback(null,res.rows);

    }catch(error){
        callback(error,null);
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
        callback(err, null);
        }
    }
  
async function insertTicket(callback){

}

export {findUser, insertUser};