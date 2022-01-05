const { HomeRouteGetController } = require("../controllers/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.get("/", HomeRouteGetController)

module.exports = HomeRouter