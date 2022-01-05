const { AdminCreateProductPostController, AdminCreateCategoryPostController } = require("../controllers/AdminController");

const AdminRouter = require("express").Router();

AdminRouter.post("/categories/new", AdminCreateCategoryPostController)
AdminRouter.post("/products/new", AdminCreateProductPostController)

module.exports = AdminRouter