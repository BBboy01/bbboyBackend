const noteService = require("../services/note.service");

class NoteController {
  async getAllNotes(ctx) {
    const result = await noteService.getNotes();

    ctx.body = { msg: "ok", data: result };
  }

  async getSpecificNotes(ctx) {
    const { noteId } = ctx.params;
    const result = await noteService.getNoteById(noteId);

    ctx.body = { msg: result ? "ok" : "not found", data: result };
  }

  async addNote(ctx) {
    const result = await noteService.createNote(ctx.request.body);

    ctx.body = {
      msg: result ? "ok" : "create or update note failed",
      data: {},
    };
  }

  async patchNote(ctx) {
    const { title, content, isShow, iconUrl, category } = ctx.request.body;
    const result = await noteService.updateNote(title, content, isShow, iconUrl, category);

    ctx.body = { msg: result ? "ok" : "update note failed", data: {} };
  }
}

module.exports = new NoteController();
