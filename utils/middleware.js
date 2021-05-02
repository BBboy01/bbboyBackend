const fs = require("fs");
const { logger } = require("./logger");

async function handleError(ctx, next) {
  try {
    await next();
  } catch (e) {
    logger.error(e);
    ctx.status = 500;
    ctx.body = "<h1 style=color:#9076e7>一股神秘的力量将你带离</h1>";
  }
}

async function handle404(ctx, next) {
  await next();
  if (parseInt(ctx.status) === 404) {
    ctx.status = 404;
    ctx.body = fs.readFileSync("./public/404.html").toString();
  }
}

module.exports = {
  handleError,
  handle404,
};
