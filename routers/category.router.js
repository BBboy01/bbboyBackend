const Router = require("koa-router");
const categoryRouter = new Router({ prefix: "/categories" });
const { getCategories } = require("../controllers/category.controller");

categoryRouter.get("/", getCategories);

module.exports = categoryRouter;
