const Router = require("koa-router");

const {
  getAllNotes,
  getSpecificNotes,
  addNote,
  patchNote,
} = require("../controllers/note.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");
const { validateAddNote, validatePatchNote } = require("../middlewares/validate.middleware");

const noteRouter = new Router({ prefix: "/note" });

noteRouter.get("/", getAllNotes);
noteRouter.get("/:noteId", getSpecificNotes);
noteRouter.post("/", verifyAuth, validateAddNote, addNote);
noteRouter.patch("/", verifyAuth, validatePatchNote, patchNote);

module.exports = noteRouter;
