const app = require("./configs/app.config");
const { port } = require("./configs/config");

app.listen(port, () => {
  console.log(`server runs in http://localhost:${port}/`);
});
