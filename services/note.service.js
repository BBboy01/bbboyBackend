const connection = require("../db");
const md2html = require("../utils/md2html");
const { getAllCategory } = require("./categories.service");

class NoteService {
  async getNotes() {
    const statement = `SELECT * FROM bbboy ORDER BY visits DESC`;
    const [result] = await connection.execute(statement);
    const statementOrderByTime = `SELECT * FROM bbboy ORDER BY update_at DESC`;
    const [resultOrdered] = await connection.execute(statementOrderByTime);

    return { orderedByVisit: result, orderedByTime: resultOrdered };
  }

  async getNoteById(noteId) {
    if (typeof parseInt(noteId) !== "number") return null;
    const statement = `SELECT * FROM bbboy WHERE id = ?`;
    const [result] = await connection.execute(statement, [noteId]);
    if (!result[0]) return null;
    // visit number +1
    result[0] &&
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
    const { title, content, isShow = 1, iconUrl, category } = data;
    // title = title.split(".").slice(0, -1).join("");
    const htmlContentBase64 = Buffer.from(await md2html(content), "utf-8").toString("base64");
    // if user specified icon url, then replace the prepared icon url
    const iconUrls = await getAllCategory();
    const resultCategory = iconUrls.categories.includes(category) ? category : "unknown";
    const iconUrlResult = iconUrl ? iconUrl : iconUrls.iconUrls[resultCategory];
    // check if notes exist
    const result = await this.getNoteByTitle(title);
    if (result[0]) {
      // do update
      const updateResult = await this.updateNote(
        title,
        htmlContentBase64,
        isShow,
        iconUrlResult,
        resultCategory
      );

      return updateResult ? true : false;
    }
    // add note
    const statement = `INSERT INTO bbboy (title, content, icon_url, category, is_show) VALUES (?, ?, ?, ?, ?)`;
    const [addResult] = await connection.execute(statement, [
      title,
      htmlContentBase64,
      iconUrlResult,
      resultCategory,
      isShow,
    ]);

    return addResult ? true : false;
  }

  async updateNote(
    title,
    content,
    isShow = 1,
    iconUrl = "https://cdn.iconscout.com/icon/premium/png-128-thumb/minecraft-78-554374.png",
    category
  ) {
    const statement = `UPDATE bbboy SET content = ?, is_show = ?, icon_url = ?, category = ? WHERE title = ?`;
    const result = await connection.execute(statement, [content, isShow, iconUrl, category, title]);

    return result;
  }
}

module.exports = new NoteService();
