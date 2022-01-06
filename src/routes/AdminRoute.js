const { AdminCreateProductPostController, AdminCreateCategoryPostController, AdminLoginPostController } = require("../controllers/AdminController");

const AdminRouter = require("express").Router();

AdminRouter.post("/login", AdminLoginPostController)
AdminRouter.post("/categories/new", AdminCreateCategoryPostController)
AdminRouter.post("/products/new", AdminCreateProductPostController)

module.exports = AdminRouter