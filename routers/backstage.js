const Router = require("koa-router");
const md5 = require("md5");
const moment = require("moment");
const connection = require("../db/database");

const router = new Router();
const { md5Salt, iconUrls } = require("../config/config");
const md2html = require("../utils/md2html");

router.post("/api/backstage/login", async (ctx) => {
  const { username, password, image_code } = ctx.request.body;
  let statement;

  // check necessary params is correct
  if (!username || !password || !image_code) {
    ctx.body = { statusCode: 4399, msg: "lack necessary params" };
    return;
  }

  // try get user info by the username user entered
  statement = `SELECT * FROM bbboyUser WHERE username = ?`;
  const [result] = await connection.execute(statement, [username]);

  if (!result[0]) {
    ctx.body = {
      statusCode: 4597,
      msg: "username or password is incorrect, please check it and try again.",
    };
    return;
  }

  // check password
  if (md5(md5(password) + md5Salt) !== result[0].password) {
    ctx.body = {
      statusCode: 4696,
      msg: "username or password is incorrect, please check it and try again.",
    };
    return;
  }

  // set login info
  ctx.session.user_id = md5(
    md5(result[0].id) + md5Salt.slice(parseInt(md5Salt.length / 2))
  );

  // update last_login
  statement = `UPDATE bbboyUser SET last_login = ? WHERE id = ?`;
  await connection.execute(statement, [
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    result[0].id,
  ]);

  ctx.body = { statusCode: 4000, msg: "login success" };
});

router.post("/api/backstage/logout", async (ctx) => {
  delete ctx.session.user_id;
  ctx.body = { statusCode: 4765, msg: "log out success" };
});

router.post("/api/note/add", async (ctx) => {
  const { title, category, content, iconUrl, timeStamp } = ctx.request.body;
  let statement;

  // check params not null
  if (!title || !category || !content || !timeStamp) {
    ctx.body = { statusCode: 4000, msg: "Lack of necessary is necessary" };
  }

  title = title.split(".").slice(0, -1).join("");
  const htmlContentBase64 = Buffer.from(
    await md2html(content),
    "utf-8"
  ).toString("base64");
  const time = moment(timeStamp).format("YYYY-MM-DD HH:mm:ss");

  // check whether file exist by file name
  statement = `SELECT * FROM bbboy WHERE title = ?`;
  const [result] = await connection.execute(statement, [title]);
  if (result[0]) {
    ctx.body = { statusCode: 4002, msg: "this note already exist" };
  }

  // if user specified icon url, then replace the prepared icon url
  const iconUrlResult = iconUrls.data[category];
  if (iconUrl) {
    iconUrlResult = iconUrl;
  }

  // add note
  statement = `INSERT INTO bbboy(title, content, update_time, icon_url, category) VALUES (?, ?, ?, ?, ?)`;
  const [addResult] = await connection.execute(statement, [
    title,
    htmlContentBase64,
    time,
    iconUrlResult,
    category,
  ]);

  if (!addResult.insertId) {
    ctx.body = { statusCode: 8888888, msg: "unknown error" };
  }

  ctx.body = { statusCode: 4001, msg: "upload success" };
});

router.get("/api/categories", async (ctx) => {
  ctx.body = { categoryList: iconUrls.categories };
});

module.exports = router;
