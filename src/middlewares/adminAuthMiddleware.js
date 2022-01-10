const { verifyToken } = require("../modules/jwt");

module.exports = async function AdminAuth(req, res, next){
    try {
        let token = req.headers["authorization"]

        if(!token) throw new res.error(401, "Unauthorized");

        token = await verifyToken(token);

        const session = await req.db.sessions.findOne({
            where: {
                session_id: token.session_id,
            },
            include: {
                model: req.db.admins
            },
            raw: true
        })

        if(!session) throw new res.error(401, "Unauthorized")
        req.session = session;

		next();
    } catch (error) {
        next(error)
    }
}