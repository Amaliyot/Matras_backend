const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "Test"

module.exports.createToken = function (user) {
	return jwt.sign(user, SECRET_KEY);
};

module.exports.verifyToken = function (token) {
	return jwt.verify(token, SECRET_KEY);
};