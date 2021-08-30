const connection = require("../db");

class CategoryService {
  async getAllCategory() {
    const statement = `SELECT * FROM categories`;
    const [result] = await connection.execute(statement);
    const categoryResult = { categories: [], iconUrls: {} };
    result.forEach((item) => {
      categoryResult.categories.push(item.category);
      categoryResult.iconUrls[item.category] = item.icon_url;
    });

    return categoryResult;
  }
}

module.exports = new CategoryService();
