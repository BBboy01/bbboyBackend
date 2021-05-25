const md5Salt = process.env.SALT;
const port = process.env.SERVER_PORT;
const sqlHost = process.env.SQL_URL;
const sqlPort = process.env.SQL_PORT;
const sqlUserName = process.env.SQL_USERNAME;
const sqlPassword = process.env.SQL_PWD;
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
  iconUrls,
};
