const Router = require("koa-router");
const router = new Router();
const connection = require("../db/database");

// return all note title
router.get("/api/notes", async (ctx) => {
  let statement;
  if (ctx.query.num) {
    statement = `SELECT id,title,icon_url,visits,category,update_time FROM bbboy limit 2`;
  } else {
    statement = `SELECT id,title,icon_url,visits,category,update_time FROM bbboy`;
  }
  const [result] = await connection.execute(statement);

  ctx.body = result;
});

// get content of note by id
router.get("/api/note/:id", async (ctx) => {
  const statement = `SELECT id, title, content, update_time, visits FROM bbboy WHERE id = ?`;
  const [content] = await connection.execute(statement, [ctx.params.id]);
  if (!content[0]) {
    ctx.body = { statusCode: 4300, msg: "no such note" };
  } else {
    // visit number plus one
    const statement = `UPDATE bbboy SET visits = ? WHERE id = ?`;
    await connection.execute(statement, [content[0].visits + 1, ctx.params.id]);
  }
  ctx.body = content[0];
});

module.exports = router;
