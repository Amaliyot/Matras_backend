const {LoginPostController} = require("../controllers/Admin/AdminController");
const {CreateCategoryPostController, EditCategoryPostController, RemoveCategoryController} = require("../controllers/Admin/CategoryController");
const {CreateProductPostController, UpdateProductPostController, DeleteProductController, ProductsGetController} = require("../controllers/Admin/ProductController");

const AdminRouter = require("express").Router();

const fileUpload = require("express-fileupload");
const configFileUpload = {
	safeFileNames: false,
};

AdminRouter.post("/login", LoginPostController)

// Category
AdminRouter.post("/categories/new", CreateCategoryPostController)
AdminRouter.put("/categories", EditCategoryPostController)
AdminRouter.post("/categories/:id", RemoveCategoryController)

// Products
AdminRouter.get("/products", ProductsGetController)
AdminRouter.post("/products/new", fileUpload(configFileUpload), CreateProductPostController)
AdminRouter.put("/products/:id", fileUpload(configFileUpload), UpdateProductPostController)
AdminRouter.delete("/products/rm/:id", DeleteProductController)

module.exports = AdminRouter