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
    `select id,title,content,update_time from bbboy where id=${ctx.params.id}`
  );
  ctx.body = content[0]
    ? content[0]
    : { statusCode: 4300, msg: "no such note" };
});

// get 6 lately updated notes
router.get("/api/update", async (ctx) => {
  let recentUpdate = await handleDB(
    ctx.response,
    "bbboy",
    "sql",
    "get update error",
    "select id,title,content,update_time from bbboy order by update_time desc limit 6"
  );
  ctx.body = recentUpdate;
});

module.exports = router;
