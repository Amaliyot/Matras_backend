const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const {LoginPostController} = require("../controllers/Admin/AdminController");
const {CreateCategoryPostController, EditCategoryPostController, RemoveCategoryController, CategoriesGetController} = require("../controllers/Admin/CategoryController");
const {CreateProductPostController, UpdateProductPostController, DeleteProductController, ProductsGetController} = require("../controllers/Admin/ProductController");
const { TechnologiesGetController, CreateTechnologiesPostControllers, UpdateTechnologiesPostControllers, DeleteTechnologiesPostControllers } = require("../controllers/Admin/TechnologyController");
const { DeleteTechnologyPhotoPostController, DeleteProductPhotoPostController, DeleteAdressPhotoPostController } = require("../controllers/Admin/FilesController");
const { AdressesGetController, CreateAdressPostControllers, UpdateAdressPostControllers, DeleteAdressPostControllers } = require("../controllers/Admin/AddressController");

const AdminRouter = require("express").Router();

const fileUpload = require("express-fileupload");
const { UpdateClientPhonePostController, ClientPhonesGetController, DeleteClientPhonePostController } = require("../controllers/Admin/ClientPhoneController");
const configFileUpload = {
	safeFileNames: false,
};

AdminRouter.use(adminAuthMiddleware)

AdminRouter.post("/login", LoginPostController)

// Category
AdminRouter.get("/categories", CategoriesGetController)
AdminRouter.post("/categories/new", CreateCategoryPostController)
AdminRouter.put("/categories/:id", EditCategoryPostController)
AdminRouter.delete("/categories/rm/:id", RemoveCategoryController)

// Products
AdminRouter.get("/products", ProductsGetController)
AdminRouter.post("/products/new", fileUpload(configFileUpload), CreateProductPostController)
AdminRouter.put("/products/status/:id", UpdateProductStatusPostController)
AdminRouter.delete("/products/rm/:id", DeleteProductController)
AdminRouter.delete("/products/files/rm/:id", DeleteProductPhotoPostController)

// Technologies
AdminRouter.get("/technologies", TechnologiesGetController)
AdminRouter.post("/technologies/new", fileUpload(configFileUpload), CreateTechnologiesPostControllers)
AdminRouter.put("/technologies/:id", fileUpload(configFileUpload), UpdateTechnologiesPostControllers)
AdminRouter.delete("/technologies/rm/:id", DeleteTechnologiesPostControllers)
AdminRouter.delete("/technologies/files/rm/:id", DeleteTechnologyPhotoPostController)

// Addresses
AdminRouter.get("/addresses", AdressesGetController)
AdminRouter.post("/addresses/new", fileUpload(configFileUpload), CreateAdressPostControllers)
AdminRouter.put("/addresses/:id", fileUpload(configFileUpload), UpdateAdressPostControllers)
AdminRouter.delete("/addresses/rm/:id", DeleteAdressPostControllers)
AdminRouter.delete("/addresses/files/rm/:id", DeleteAdressPhotoPostController)

// Client phones
AdminRouter.get("/contacts", ClientPhonesGetController)
AdminRouter.put("/contacts/:id", UpdateClientPhonePostController)
AdminRouter.delete("/contacts/rm/:id", DeleteClientPhonePostController)


module.exports = AdminRouter