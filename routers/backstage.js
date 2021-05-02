const Router = require("koa-router");
const md5 = require("md5");
const moment = require("moment");
const handleDB = require("../db/handleDB");
const Captcha = require("../utils/captcha");

const router = new Router();
const { md5Salt } = require("../config/config");

router.get("/backstage/image_code/:float", async (ctx) => {
  let captchaObj = new Captcha();
  let captcha = captchaObj.getCode();
  // captcha.text  // 图片验证码文本
  // captcha.data  // 图片验证码图片内容信息

  // 保存图片验证码文本到session
  ctx.session.imageCode = captcha.text;
  ctx.set("Content-Type", "image/svg+xml");
  ctx.body = captcha.data;
});

router.post("/backstage/login", async (ctx) => {
  let { username, password, image_code } = ctx.request.body;

  // check necessary params is correct
  if (!username || !password || !image_code) {
    ctx.body = { statusCode: 4399, msg: "lack necessary params" };
    return;
  }

  // check image_code by signed session
  // if (image_code.toLowerCase() !== ctx.session.imageCode.toLowerCase()) {
  //   ctx.body = {
  //     statusCode: 4498,
  //     msg: "image verify code entered not correct",
  //   };
  //   return;
  // }

  // try get user info by the username user entered
  let result = await handleDB(
    ctx.response,
    "bbboyUser",
    "find",
    "get user error",
    `username='${username}'`
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

  // set login info
  ctx.session.user_id = md5(
    md5(result[0].id) + md5Salt.slice(parseInt(md5Salt.length / 2))
  );

  // update last_login
  await handleDB(
    ctx.response,
    "bbboyUser",
    "update",
    "set last login error",
    `id=${result[0].id}`,
    { last_login: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") }
  );

  ctx.body = { statusCode: 4000, msg: "login success" };
});

router.post("/backstage/logout", async (ctx) => {
  delete ctx.session.user_id;
  ctx.body = { statusCode: 4765, msg: "log out success" };
});

router.post("/note/add", async (ctx) => {
  ctx.body = "todo";
});

module.exports = router;
