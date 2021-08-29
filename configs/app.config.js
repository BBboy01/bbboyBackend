const Koa = require("koa");
const session = require("koa-session");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const formidable = require("koa2-formidable");
const koaRouter = require("koa-router")();
const path = require("path");

const noteRouter = require("../routers/note.router");
const authRouter = require("../routers/auth.router");
// const backstageRouter = require("../routers/backstage");
const { md5Salt } = require("./config");
const { handleError, handle404 } = require("../utils/handleExceptions");
const { accessLogger } = require("../utils/logger");
const errorHandler = require("../utils/errorHandler");

const app = new Koa();

app.keys = [md5Salt.slice(parseInt(md5Salt.length / 3))]; // set session signed key

app
  // log every error
  .on("error", errorHandler)
  .use(accessLogger())
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
  })
  .use(static(path.join(__dirname, "public")))
  .use(session({ maxAge: 1000 * 3600 }, app))
  .use(formidable())
  .use(
    bodyParser({
      enableTypes: ["json", "form", "text"],
    })
  )
  .use(handleError)
  .use(handle404)
  .use(noteRouter.routes())
  .use(authRouter.routes())
  // .use(backstageRouter.routes())
  .use(koaRouter.allowedMethods()); // according to 'ctx.status' to set response header of 'response'

module.exports = app;