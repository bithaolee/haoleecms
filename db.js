var mysql = require('mysql');
var config = require('./config');
var Promise = require('bluebird');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

var pool = mysql.createPool(config.db);

function getSqlConnection() {
    return pool.getConnectionAsync().disposer(function (connection) {
        connection.release();
    });
}

module.exports = getSqlConnection;
