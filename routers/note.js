const Router = require("koa-router");
const router = new Router();
const handleDB = require("../db/handleDB");

router.get("/", async (ctx) => {
  ctx.body = "Home";
});

// return all note title
router.get("/notes", async (ctx) => {
  noteTitles = await handleDB(
    ctx.response,
    "bbboy",
    "find",
    "get all notes error",
    ["title"]
  );
  ctx.body = noteTitles.reduce((pre, cur) => {
    let title = cur.title ? cur.title : null;
    pre.push(title);
    return pre;
  }, []);
});

// get content of note by id
router.get("/note/:id", async (ctx) => {
  let content = await handleDB(
    ctx.response,
    "bbboy",
    "sql",
    "get content error",
    `select title,content from bbboy where id=${ctx.params.id}`
  );
  ctx.body = content[0]
    ? content[0]
    : { statusCode: 4300, msg: "no such note" };
});

// get 6 lately updated notes
router.get("/update", async (ctx) => {
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
