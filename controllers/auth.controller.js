const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../configs/config");

class AuthController {
  async login(ctx) {
    const { id, username } = ctx.user;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = { msg: "ok", data: { id, username, token } };
  }

  async success(ctx) {
    ctx.body = { msg: "ok", data: {} };
  }
}

module.exports = new AuthController();
