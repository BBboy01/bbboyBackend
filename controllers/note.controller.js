const { getNotes, getNote } = require("../services/note.service");

class NoteController {
  async getAllNotes(ctx) {
    const result = await getNotes();

    ctx.body = { msg: "ok", data: result };
  }

  async getSpecificNotes(ctx) {
    const { noteId } = ctx.params;

    console.log("in");
    const result = await getNote(noteId);

    ctx.body = !!result
      ? { msg: "ok", data: result }
      : { msg: "failed", data: {} };
  }
}

module.exports = new NoteController();
