const log4js = require("koa-log4");

log4js.configure("./config/logger.config.json");

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger("access")); //记录所有访问级别的日志
exports.logger = log4js.getLogger("application"); //记录ERROR级别的日志
