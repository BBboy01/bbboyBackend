const Ajv = require("ajv");

const { DATA_VALIDATE_FAILED, NONEXISTENT_NOTE } = require("../configs/errorTypes");
const { getNoteByTitle } = require("../services/note.service");

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
    console.log(validate.errors);
    return ctx.app.emit("error", new Error(DATA_VALIDATE_FAILED), ctx);
  }
  await next();
};

const validatePatchNote = async (ctx, next) => {
  const valid = validate(ctx.request.body);
  if (!valid) {
    return ctx.app.emit("error", new Error(DATA_VALIDATE_FAILED), ctx);
  }
  const isExist = await getNoteByTitle(ctx.request.body.title);
  if (!isExist[0]) {
    return ctx.app.emit("error", new Error(NONEXISTENT_NOTE), ctx);
  }
  await next();
};

module.exports = { validateAddNote, validatePatchNote };
