const mysql = require('mysql2');

const pool =  mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user : process.env.DB_USER || 'root',
    database : process.env.DB_NAME || 'HomeWorksDB',
    port : process.env.DB_PORT || 3306,
    password : process.env.DB_PASSWORD || '3b172029a3bee21713c341febff1895678085e052f91773480d945f062acdabceaab7532ebb2c89e3602e8d8498160c8511194007f7f9bcf855fc14392441fbe'
});

module.exports = pool.promise();    