const { ProductPhotosGetController, TechnologyPhotosGetController } = require("../controllers/Admin/FilesController");
const { HomeRouteGetController } = require("../controllers/Client/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeRouteGetController)
HomeRouter.get("/products/files", ProductPhotosGetController)
HomeRouter.get("/technologies/files", TechnologyPhotosGetController)

module.exports = HomeRouter