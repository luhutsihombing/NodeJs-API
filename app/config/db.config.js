require('dotenv').config();

'user strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected to database.");
});

module.exports = connection;