const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "keys/public.key"));

dotenv.config();

module.exports = {
  md5Salt,
  port,
  sqlHost,
  sqlPort,
  sqlUserName,
  sqlPassword,
  sqlDatabase,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
