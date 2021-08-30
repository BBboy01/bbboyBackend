const errorTypes = require("../configs/errorTypes");
const { logger } = require("../utils/logger");

const errorHandler = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case errorTypes.NAME_AND_PASSWORD_ARE_REQUIRED:
      status = 400; // bad request
      message = "用户名或密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户已存在";
      break;
    case errorTypes.USER_DOES_NOT_EXIST:
      status = 400;
      message = "用户不存在";
      break;
    case errorTypes.PASSWORD_INCORRECT:
      status = 400;
      message = "密码错误";
      break;
    case errorTypes.UNAUTHORIZED:
      status = 401; // permission denied
      message = "无效或过期的token";
      break;
    case errorTypes.NOT_PERMITTED:
      status = 401;
      message = "无权限的操作";
      break;
    case errorTypes.DATA_VALIDATE_FAILED:
      status = 400;
      message = "数据格式有误";
      break;
    case errorTypes.NONEXISTENT_NOTE:
      status = 400;
      message = "不存在的笔记";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }
  logger.error(err);

  ctx.status = status;
  ctx.body = { msg: message, data: {} };
};

module.exports = errorHandler;
