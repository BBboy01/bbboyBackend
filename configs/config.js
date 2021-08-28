const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "keys/public.key"));

dotenv.config();

const iconUrls = {
  categories: ["Python", "NodeJs", "Vue", "JavaScript", "unknown"],
  data: {
    Python: "https://cdn.iconscout.com/icon/free/png-128/python-2-226051.png",
    NodeJs: "https://cdn.iconscout.com/icon/free/png-128/nodejs-6-569582.png",
    Vue: "https://cdn.iconscout.com/icon/free/png-128/vue-282497.png",
    JavaScript:
      "https://cdn.iconscout.com/icon/free/png-128/javascript-2038874-1720087.png",
    unknown:
      "https://cdn.iconscout.com/icon/premium/png-128-thumb/minecraft-78-554374.png",
  },
};

module.exports = {
  md5Salt,
  port,
  sqlHost,
  sqlPort,
  sqlUserName,
  sqlPassword,
  sqlDatabase,
} = process.env;

module.exports.iconUrls = iconUrls;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
