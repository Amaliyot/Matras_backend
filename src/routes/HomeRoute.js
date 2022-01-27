const { AdressesGetController } = require("../controllers/Admin/AddressController");
const { CategoriesGetController } = require("../controllers/Admin/CategoryController");
const { CreateClientPhonePostController } = require("../controllers/Admin/ClientPhoneController");
const { ProductPhotosGetController, TechnologyPhotosGetController, AdressPhotosGetController } = require("../controllers/Admin/FilesController");
const { ProductsGetController } = require("../controllers/Admin/ProductController");
const { TechnologiesGetController } = require("../controllers/Admin/TechnologyController");
const { HomeRouteGetController } = require("../controllers/Home/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeRouteGetController)
HomeRouter.get("/products/files", ProductPhotosGetController)
HomeRouter.get("/technologies/files", TechnologyPhotosGetController)
HomeRouter.get("/addresses/files", AdressPhotosGetController)
HomeRouter.get("/technologies", TechnologiesGetController)
HomeRouter.get("/products", ProductsGetController)
HomeRouter.get("/categories", CategoriesGetController)
HomeRouter.get("/addresses", AdressesGetController)
HomeRouter.post("/contacts", CreateClientPhonePostController)

module.exports = HomeRouter