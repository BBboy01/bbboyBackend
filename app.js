const Koa = require("koa");
const app = new Koa();
const router = require("./routers/note").routes();

app.use(router);

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
