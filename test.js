// const Ajv = require("ajv/dist/jtd");
// const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// ajv.addFormat("bit", {
//   type: "number",
//   validate: (x) => x == 0 || x === 1,
// });

// const schema = {
//   type: "object",
//   properties: {
//     title: { type: "string" },
//     content: { type: "string" },
//     isShow: { type: "bit" },
//     iconUrl: { type: "url" },
//     category: { type: "string" },
//   },
//   required: ["title", "content", "category"],
//   additionalProperties: false,
// };

// const data = { das: "cxz", cxzc: "dsad" };

// const validate = ajv.compile(schema);
// const valid = validate(data);
// if (!valid) {
//   console.log(validate.errors);
// } else {
//   console.log("ok");
// }

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
require("ajv-formats")(ajv);

ajv.addFormat("bit", {
  type: "number",
  validate: (x) => x == 0 || x === 1,
});

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
    category: { type: "string" },
    iconUrl: { type: "string", format: "url" },
    isShow: { type: "number", format: "bit" },
  },
  required: ["foo", "bar", "title", "content", "category", "iconUrl", "isShow"],
  additionalProperties: false,
};

// const schema = {
//   required: ["title", "content", "category"],
// };

const validate = ajv.compile(schema);

const data = {
  foo: 1,
  bar: "abc",
  title: "dio",
  content: "aaa",
  category: "zzz",
  iconUrl: "http://www.dio.com",
  isShow: 5,
};

const valid = validate(data);
if (!valid) {
  for (const err of validate.errors) {
    console.log(err.instancePath.replace("/", "") + " " + err.message);
  }
}
console.log(valid);
