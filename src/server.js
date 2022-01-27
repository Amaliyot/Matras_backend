const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const postgres = require("./modules/postgres/pg");
const customErrorMiddleware = require("./middlewares/customErrorMiddleware");
const Router = require("./routes");
const errorHandler = require("./helpers/errorHandler");

async function server(port) {
	try {
		app.listen(port || 8600, () =>
			console.log(`SERVER READY ${port || 8600}`)
		);
		app.use(cors())

		const db = await postgres();

		app.use(async (req, res, next) => {
            req.db = await db;
            next();
        });

		app.use(customErrorMiddleware);

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use("/public", express.static(path.join(__dirname, 'public')))

		app.use("/v1", Router)
		app.use(errorHandler)

	} catch (error) {
		console.log("SERVER ERROR", error);
	} 
}

module.exports = server