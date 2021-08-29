// const {
//   getNotes,
//   getNoteById,
//   createNote,
// } = require("../services/note.service");
const noteService = require("../services/note.service");

class NoteController {
  async getAllNotes(ctx) {
    const result = await noteService.getNotes();

    ctx.body = { msg: "ok", data: result };
  }

  async getSpecificNotes(ctx) {
    const { noteId } = ctx.params;

    console.log("in");
    const result = await noteService.getNoteById(noteId);

    ctx.body = !!result
      ? { msg: "ok", data: result }
      : { msg: "failed", data: {} };
  }

  async addNote(ctx) {
    const result = await noteService.createNote(ctx.request.body);
    ctx.body = {
      msg: result ? "ok" : "create or update note failed",
      data: {},
    };
  }
}

module.exports = new NoteController();
