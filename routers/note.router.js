const Router = require("koa-router");
const noteRouter = new Router({ prefix: "/note" });

const {
  getAllNotes,
  getSpecificNotes,
  addNote,
} = require("../controllers/note.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");
const { validateAddNote } = require("../middlewares/validate.middleware");

noteRouter.get("/", getAllNotes);
noteRouter.get("/:noteId", getSpecificNotes);
noteRouter.post("/", verifyAuth, validateAddNote, addNote);

module.exports = noteRouter;
