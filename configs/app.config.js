const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const swagger = require("swagger2");
const { ui, validate } = require("swagger2-koa");

const useRoutes = require("../routers");
const { handleError, handle404 } = require("../utils/handleExceptions");
const { accessLogger } = require("../utils/logger");
const errorHandler = require("../utils/errorHandler");

const swaggerDocument = swagger.loadDocumentSync("configs/api.yaml");

const app = new Koa();

// validate document
// if (!swagger.validateDocument(swaggerDocument)) {
//   throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
// }

app
  .on("error", errorHandler)
  // log every error
  .use(accessLogger())
  .use(cors())
  // .use(async (ctx, next) => {
  //   ctx.set("Access-Control-Allow-Origin", "*");
  //   await next();
  // })
  .use(
    bodyParser({
      enableTypes: ["json", "form", "text"],
    })
  )
  .use(ui(swaggerDocument, "/swagger"))
  // .use(validate(swaggerDocument))
  .use(handleError)
  .use(handle404);

useRoutes(app);

module.exports = app;
