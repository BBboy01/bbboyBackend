const app = require("./config/app.config");
const { port } = require("./config/config");

app.listen(port, () => {
  console.log(`server runs in http://localhost:${port}/`);
});
