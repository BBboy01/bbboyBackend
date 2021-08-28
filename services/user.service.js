const connection = require("../db");

class UserService {
  async checkUserExist(username) {
    const statement = `SELECT id, username, password, last_login, avatar_url FROM bbboyUser WHERE username = ?`;
    const [result] = await connection.execute(statement, [username]);

    return result[0];
  }
}

module.exports = new UserService();
