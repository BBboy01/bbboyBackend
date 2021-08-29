const connection = require("../db");

class NoteService {
  async getNotes() {
    const statement = `SELECT id, title, icon_url, visits, category, update_time FROM bbboy limit 2`;
    const [result] = await connection.execute(statement);

    return result;
  }

  async getNote(noteId) {
    const statement = `SELECT id, title, content, update_time, visits FROM bbboy WHERE id = ?`;
    const [result] = await connection.execute(statement, [noteId]);
    // visit number add one
    !!result[0] &&
      (await connection.execute(`UPDATE bbboy SET visits = ? WHERE id = ?`, [
        result[0].visits + 1,
        noteId,
      ]));

    return result[0];
  }

  async createNote(data) {
    const { title, content, isShow, iconUrl, category } = data;
  }
}

module.exports = new NoteService();
