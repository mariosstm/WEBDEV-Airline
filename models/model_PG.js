import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

 const pool = new pg.Pool({
     user: process.env.PGUSER,
     host: process.env.PGHOST,
     database: process.env.PGDATABASE,
     password: process.env.PGPASSWORD,
     port: process.env.PGPORT
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
/*
async function existingEmail(Email,callback){

}

async function findUser(Email,Username,Password,callback){
    

*/


async function insertUser (ID,Fname,Mname,Lname,Email,Cellphone,Username,Password,NewsLetter, callback) {
    // εισαγωγή νέου χρήστη, και επιστροφή στο callback της νέας εγγραφής
    
    const sql = `INSERT INTO public."User"("Fname","Mname","Lname","Email","Cellphone","Username","Password","NewsLetter") VALUES ('${Fname}','${Mname}','${Lname}','${Email}','${Cellphone}','${Username}','${Password}',${true}) RETURNING "ID";`
    console.log('to insert...', sql)
    // how to return the autoincremented value of an inserted record: https://stackoverflow.com/questions/37243698/how-can-i-find-the-last-insert-id-with-node-js-and-postgresql
    try {
        const client = await connect();
        const res = await client.query(sql);
        
        await client.release();
        console.log(`user inserted`);
        callback(null, [{"ID":res.rows[0].ID,"Fname": Fname,"Mname":Mname,"Lname":Lname,"Email":Email,"Cellphone":Cellphone,"Username":Username,"Password":Password,"NewsLetter":NewsLetter }]); 
    } 
    catch (err) {
        console.log(err);
        callback(err, null);
        }
    }

export {insertUser};