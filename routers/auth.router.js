const Router = require("koa-router");

const { verifyLogin, verifyAuth } = require("../middlewares/auth.middleware");
const { login, success } = require("../controllers/auth.controller");

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/", verifyLogin, login);
authRouter.get("/", verifyAuth, success);

module.exports = authRouter;
