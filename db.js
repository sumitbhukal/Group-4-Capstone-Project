const mysql=require('mysql');

const pool=mysql.createPool({
    connectionLimit:100,
    host:process.env.DB_host,
    user:process.env.DB_user,
    password:process.env.DB_password,
    database:process.env.DB_name
});
module.exports=pool;