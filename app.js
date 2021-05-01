const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./routers/note");
const koaRouter = require("koa-router")();
const { port } = require("./app.config");

const app = new Koa();

app.use(router.routes());
app.use(koaRouter.allowedMethods()); // according to 'ctx.status' to set response header of 'response'
app.use(bodyParser);

app.listen(port, () => {
  console.log(`server runs in http://localhost:${port}/`);
});
