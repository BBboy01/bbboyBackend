const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const path = require("path");
const router = require("./routers/note");
const koaRouter = require("koa-router")();
const { port } = require("./app.config");
const { handleError, handle404 } = require("./utils/middleware");

const app = new Koa();

app
  .use(static(path.join(__dirname, "public")))
  .use(handleError)
  .use(handle404)
  .use(router.routes())
  .use(koaRouter.allowedMethods()) // according to 'ctx.status' to set response header of 'response'
  .use(bodyParser())
  .listen(port, () => {
    console.log(`server runs in http://localhost:${port}/`);
  });
