const mysql = require('mysql2');
require('dotenv').config();

let DB_HOST, DB_USER, DB_PASSWORD, DB, DB_CONNECT;

if (process.env.NODE_ENV === 'development') {
    DB_HOST = process.env.DB_HOST;
    DB_USER = process.env.DB_USER;
    DB_PASSWORD = process.env.DB_PASSWORD;
    DB = process.env.DB;
    DB_CONNECT = 'development'
} else {
    DB_HOST = process.env.DB_HOST_TEST;
    DB_USER = process.env.DB_USER_TEST;
    DB_PASSWORD = process.env.DB_PASSWORD_TEST;
    DB = process.env.DB_TEST;
    DB_CONNECT = 'testing'
}

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB,
});


console.log(`connected to ${DB_CONNECT} database`)


module.exports = pool;