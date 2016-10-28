var mysql = require('mysql');
var config = require('./config');

var connection = mysql.createPool(config.db);

connection.connect();


module.exports = connection;
