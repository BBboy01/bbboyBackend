const md5Salt = process.env.SALT;
const port = process.env.SERVER_PORT;
const sqlHost = process.env.SQL_URL;
const sqlPort = process.env.SQL_PORT;
const sqlUserName = process.env.SQL_USERNAME;
const sqlPassword = process.env.SQL_PWD;

module.exports = {
  md5Salt,
  port,
  sqlHost,
  sqlPort,
  sqlUserName,
  sqlPassword,
};
