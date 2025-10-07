// this file connect db to backend

require('dotenv').config();
const mysql=require('mysql2');

const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:Number(process.env.DB_PORT),
    
    waitForConnections:true,
    connectionLimit:5,
    queueLimit:0,
    ssl:{
        rejectUnauthorized:false
    }
}).promise();

// test connection once at startup

(async()=>{
    try{
        const connection=await db.getConnection();
        console.log("mysql connect ho gya h backend se");        
        connection.release();
    }
    catch(err){
        console.error("mysql connection failed",err.message)
    }
})();

// db.getConnection((err)=>{
//     if(err){
//         console.error("mysql connection failed",err)
//         return ;
//     }
//     else{
//         console.log("mysql connect ho gya h backend se");
//     }
// })

module.exports=db;