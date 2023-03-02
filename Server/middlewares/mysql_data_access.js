const mysql = require('mysql2');

const pool =  mysql.createPool({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    password : process.env.DB_PASSWORD
});

module.exports = pool.promise();    