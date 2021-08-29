const connection = require("../db");
const md2html = require("../utils/md2html");

const ICON_URLS = {
  categories: ["Python", "NodeJs", "Vue", "JavaScript", "unknown"],
  data: {
    Python: "https://cdn.iconscout.com/icon/free/png-128/python-2-226051.png",
    NodeJs: "https://cdn.iconscout.com/icon/free/png-128/nodejs-6-569582.png",
    Vue: "https://cdn.iconscout.com/icon/free/png-128/vue-282497.png",
    JavaScript:
      "https://cdn.iconscout.com/icon/free/png-128/javascript-2038874-1720087.png",
    unknown:
      "https://cdn.iconscout.com/icon/premium/png-128-thumb/minecraft-78-554374.png",
  },
};

class NoteService {
  async getNotes() {
    const statement = `SELECT id, title, icon_url, visits, category, update_time FROM bbboy limit 2`;
    const [result] = await connection.execute(statement);

    return result;
  }

  async getNoteById(noteId) {
    const statement = `SELECT id, title, content, update_time, visits FROM bbboy WHERE id = ?`;
    const [result] = await connection.execute(statement, [noteId]);
    // visit number +1
    !!result[0] &&
      (await connection.execute(`UPDATE bbboy SET visits = ? WHERE id = ?`, [
        result[0].visits + 1,
        noteId,
      ]));

    return result[0];
  }

  async getNoteByTitle(title) {
    const statement = `SELECT * FROM bbboy WHERE title = ?`;
    const [result] = await connection.execute(statement, [title]);

    return result;
  }

  async createNote(data) {
    const { title, content, isShow, iconUrl, category } = data;
    let statement;
    // title = title.split(".").slice(0, -1).join("");
    const htmlContentBase64 = Buffer.from(
      await md2html(content),
      "utf-8"
    ).toString("base64");

    const result = await this.getNoteByTitle(title);
    if (result[0]) {
      statement = `UPDATE bbboy SET content = ? WHERE id = ?`;
      const updateResult = await connection.execute(statement, [
        htmlContentBase64,
        result[0].id,
      ]);

      return updateResult ? true : false;
    }
    // if user specified icon url, then replace the prepared icon url
    const iconUrlResult = ICON_URLS.data[category];
    if (iconUrl) {
      iconUrlResult = iconUrl;
    }
    // add note
    statement = `INSERT INTO bbboy (title, content, icon_url, category) VALUES (?, ?, ?, ?)`;
    const [addResult] = await connection.execute(statement, [
      title,
      htmlContentBase64,
      iconUrlResult,
      category,
    ]);

    return addResult ? true : false;
  }
}

module.exports = new NoteService();
