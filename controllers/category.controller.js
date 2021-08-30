const Service = require("../services/categories.service");

class CategoryController {
  async getCategories(ctx) {
    const result = await Service.getAllCategory();
    ctx.body = { msg: "ok", data: result };
  }
}

module.exports = new CategoryController();
