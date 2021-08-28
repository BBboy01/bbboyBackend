const Router = require("koa-router");
const authRouter = new Router({ prefix: "/auth" });

const { verifyLogin, verifyAuth } = require("../middlewares/auth.middleware");
const { login, success } = require("../controllers/auth.controller");

authRouter.post("/", verifyLogin, login);
authRouter.get("/", verifyAuth, success);

module.exports = authRouter;
