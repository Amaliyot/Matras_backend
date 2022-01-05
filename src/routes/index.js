const Router = require("express").Router();

const AdminRouter = require("./AdminRoute");
const HomeRouter = require("./HomeRoute");

Router.use("/", HomeRouter)
Router.use("/admin", AdminRouter)

module.exports = Router