const {LoginPostController} = require("../controllers/Admin/AdminController");
const {CreateCategoryPostController, EditCategoryPostController, RemoveCategoryController, CategoriesGetController} = require("../controllers/Admin/CategoryController");
const {CreateProductPostController, UpdateProductPostController, DeleteProductController, ProductsGetController} = require("../controllers/Admin/ProductController");
const { TechnologiesGetController, CreateTechnologiesPostControllers, UpdateTechnologiesPostControllers, DeleteTechnologiesPostControllers } = require("../controllers/Admin/TechnologyController");

const AdminRouter = require("express").Router();

const fileUpload = require("express-fileupload");
const configFileUpload = {
	safeFileNames: false,
};

AdminRouter.post("/login", LoginPostController)

// Category
AdminRouter.get("/categories", CategoriesGetController)
AdminRouter.post("/categories/new", CreateCategoryPostController)
AdminRouter.put("/categories", EditCategoryPostController)
AdminRouter.post("/categories/:id", RemoveCategoryController)

// Products
AdminRouter.get("/products", ProductsGetController)
AdminRouter.post("/products/new", fileUpload(configFileUpload), CreateProductPostController)
AdminRouter.put("/products/:id", fileUpload(configFileUpload), UpdateProductPostController)
AdminRouter.delete("/products/rm/:id", DeleteProductController)

// Products
AdminRouter.get("/technologies", TechnologiesGetController)
AdminRouter.post("/technologies/new", fileUpload(configFileUpload), CreateTechnologiesPostControllers)
AdminRouter.put("/technologies/:id", fileUpload(configFileUpload), UpdateTechnologiesPostControllers)
AdminRouter.delete("/technologies/rm/:id", DeleteTechnologiesPostControllers)


module.exports = AdminRouter