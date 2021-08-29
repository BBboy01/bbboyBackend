const Ajv = require("ajv");

const { DATA_VALIDATE_FAILED } = require("../configs/errorTypes");

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
require("ajv-formats")(ajv);

ajv.addFormat("bit", {
  type: "string",
  validate: (x) => parseInt(x, 2) == 0 || parseInt(x, 2) === 1,
});

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    isShow: { type: "string", format: "bit" },
    iconUrl: { type: "string", format: "url" },
    category: { type: "string" },
  },
  required: ["title", "content", "category"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

const validateAddNote = async (ctx, next) => {
  const valid = validate(ctx.request.body);
  if (!valid) {
    return ctx.app.emit("error", new Error(DATA_VALIDATE_FAILED), ctx);
  }
  await next();
};

module.exports = { validateAddNote };
