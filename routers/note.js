const Router = require("koa-router");
const router = new Router();
const handleDB = require("../db/handleDB");

router.get("/", async (ctx) => {
  ctx.body = { statusCode: 4300, msg: "Home" };
});

// return all note title
router.get("/api/notes", async (ctx) => {
  if (ctx.query.num) {
    noteTitles = await handleDB(
      ctx.response,
      "bbboy",
      "sql",
      "get all notes error",
      "select id,title,icon_url,visits,category,update_time from bbboy limit 2"
    );
  } else {
    noteTitles = await handleDB(
      ctx.response,
      "bbboy",
      "find",
      "get all notes error",
      ["id", "title", "icon_url", "visits", "category", "update_time"]
    );
  }

  ctx.body = noteTitles;
});

// get content of note by id
router.get("/api/note/:id", async (ctx) => {
  let content = await handleDB(
    ctx.response,
    "bbboy",
    "sql",
    "get content error",
    `select id,title,content,update_time,visits from bbboy where id=${ctx.params.id}`
  );
  if (!content[0]) {
    ctx.body = { statusCode: 4300, msg: "no such note" };
  } else {
    // visit number plus one
    await handleDB(
      ctx.response,
      "bbboy",
      "update",
      "update error",
      `id=${ctx.params.id}`,
      { visits: content[0].visits + 1 }
    );
    ctx.body = content[0];
  }
});

module.exports = router;
