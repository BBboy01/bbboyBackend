const Router = require("@koa/router");

const { getCategories } = require("../controllers/category.controller");

const categoryRouter = new Router({ prefix: "/categories" });

categoryRouter.get("/", getCategories);

module.exports = categoryRouter;
