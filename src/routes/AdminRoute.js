const {LoginPostController} = require("../controllers/Admin/AdminController");
const {CreateCategoryPostController} = require("../controllers/Admin/CategoryController");
const {CreateProductPostController} = require("../controllers/Admin/ProductController");

const AdminRouter = require("express").Router();

const fileUpload = require("express-fileupload");
const configFileUpload = {
	safeFileNames: false,
};

AdminRouter.post("/login", LoginPostController)
AdminRouter.post("/categories/new", CreateCategoryPostController)
AdminRouter.post("/products/new", fileUpload(configFileUpload), CreateProductPostController)

module.exports = AdminRouter