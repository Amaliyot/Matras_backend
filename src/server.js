const express = require("express");
const path = require("path");
const app = express();
const postgres = require("./modules/postgres/pg");
const customErrorMiddleware = require("./middlewares/customErrorMiddleware");
const Router = require("./routes");
const errorHandler = require("./helpers/errorHandler");

async function server(port) {
	try {
		app.listen(process.env.PORT || 3000, () =>
			console.log(`SERVER READY ${port || 3000}`)
		);

		const db = await postgres();

		app.use(async (req, res, next) => {
            req.db = await db;
            next();
        });

		app.use(customErrorMiddleware);

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use("/public", express.static(path.join(__dirname, 'public')))

		app.use(errorHandler)
		app.use("/v1", Router)

	} catch (error) {
		console.log("SERVER ERROR", error);
	} 
}

module.exports = server