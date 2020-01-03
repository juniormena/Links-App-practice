const mysql = require('mysql');
const {database} = require('./keys');
const{promisify} = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code=== 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATBASE CONNECTION WAS CLOSED');
        }
        if(err.code=== 'ER_CON_COUNT_ERROR'){
            console.error('DATBASE CONNECTION HAS TO MANY CONNECTIONS');
        }
        if(err.code=== 'ECONNREFUSED'){
            console.error('DATBASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DATABASE IS CONNECTED');
    return;
});
//promisify pool query convertimos a promise algo que era con callbacks
pool.query = promisify(pool.query)

module.exports = pool;