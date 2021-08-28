const jwt = require("jsonwebtoken");

const { checkUserExist } = require("../services/user.service");
const { md5Password } = require("../utils/passwordHandler");
const { md5Salt } = require("../configs/config");
const { PUBLIC_KEY } = require("../configs/config");
const {
  NAME_AND_PASSWORD_ARE_REQUIRED,
  USER_DOES_NOT_EXIST,
  PASSWORD_INCORRECT,
} = require("../configs/errorTypes");

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { username, password } = ctx.request.body;
  // 判断用户名和密码是否为空
  if (!username || !password) {
    return ctx.app.emit(
      "error",
      new Error(NAME_AND_PASSWORD_ARE_REQUIRED),
      ctx
    );
  }
  // 判断用户是否存在
  const user = await checkUserExist(username);
  if (!user) {
    return ctx.app.emit("error", new Error(USER_DOES_NOT_EXIST), ctx);
  }
  // 判断密码是否正确
  if (user.password !== md5Password(md5Password(password) + md5Salt)) {
    return ctx.app.emit("error", new Error(PASSWORD_INCORRECT), ctx);
  }
  // 将user对象添加到全局
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", new Error(UNAUTHORIZED), ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithm: ["RS256"] });
    ctx.user = result;
    await next();
  } catch (error) {
    return ctx.app.emit("error", new Error(UNAUTHORIZED), ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
