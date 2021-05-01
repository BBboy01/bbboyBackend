const Router = require("koa-router");
const handleDB = require("../db/handleDB");
const md5 = require("md5");

const router = new Router();
const { md5Salt } = require("../app.config");

router.post("/backstage/login", async (ctx) => {
  let { username, password, image_code } = ctx.request.body;

  // check necessary params is correct
  if (!username || !password || !image_code) {
    ctx.body = { statusCode: 4399, msg: "lack necessary params" };
    return;
  }
  if (image_code.toLowerCase() !== req.session["imageCode"].toLowerCase()) {
    ctx.body = {
      statusCode: 4498,
      msg: "image verify code entered not correct",
    };
    return;
  }

  // try get user info by the username user entered
  let result = await handleDB(
    ctx.response,
    "bbboyUser",
    "find",
    "get user error",
    `username=${username}`
  );
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

  req.session["user_id"] = md5(
    md5(result[0].id) + md5Salt.slice(parseInt(md5Salt.length / 2))
  );
});
