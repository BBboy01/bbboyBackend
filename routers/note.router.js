const Router = require("koa-router");
const noteRouter = new Router({ prefix: "/note" });

const {
  getAllNotes,
  getSpecificNotes,
} = require("../controllers/note.controller");

noteRouter.get("/", getAllNotes);
noteRouter.get("/:noteId", getSpecificNotes);

module.exports = noteRouter;
