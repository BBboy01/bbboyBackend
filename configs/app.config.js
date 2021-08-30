const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useRoutes = require("../routers");
const { handleError, handle404 } = require("../utils/handleExceptions");
const { accessLogger } = require("../utils/logger");
const errorHandler = require("../utils/errorHandler");

const app = new Koa();

app
  // log every error
  .on("error", errorHandler)
  .use(accessLogger())
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    await next();
  })
  .use(
    bodyParser({
      enableTypes: ["json", "form", "text"],
    })
  )
  .use(handleError)
  .use(handle404);

useRoutes(app);

module.exports = app;
