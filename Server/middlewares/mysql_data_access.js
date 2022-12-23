const mysql = require('mysql2');

const pool =  mysql.createPool({
    host: process.env.DB_HOST,
    user : 'root',
    database : 'HomeWorksDB',
    port : '3306',
    password : 'password'
});

module.exports = pool.promise();    