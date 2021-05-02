const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const static = require("koa-static");
const koaRouter = require("koa-router")();
const path = require("path");

const noteRouter = require("../routers/note");
const backstageRouter = require("../routers/backstage");
const { md5Salt } = require("./config");
const { handleError, handle404 } = require("../utils/middleware");
const { logger, accessLogger } = require("../utils/logger");

const app = new Koa();

app.keys = [md5Salt.slice(parseInt(md5Salt.length / 3))]; // set session signed key

app
  // log every error
  .on("error", (err) => {
    logger.error(err);
  })
  .use(accessLogger())
  .use(static(path.join(__dirname, "public")))
  .use(session({ maxAge: 1000 * 3600 }, app))
  .use(bodyParser())
  .use(handleError)
  .use(handle404)
  .use(noteRouter.routes())
  .use(backstageRouter.routes())
  .use(koaRouter.allowedMethods()); // according to 'ctx.status' to set response header of 'response'

module.exports = app;
