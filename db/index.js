const mysql = require("mysql2");

const config = require("../configs/config");

const connections = mysql.createPool({
  host: config.sqlHost,
  port: config.sqlPort,
  database: config.sqlDatabase,
  user: config.sqlUserName,
  password: config.sqlPassword,
});

module.exports = connections.promise();
