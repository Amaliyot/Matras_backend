const { AdminSignInValidation } = require("../../modules/validations")
const { compareHash } = require("../../modules/bcrypt")
const { createToken } = require("../../modules/jwt")


module.exports = class AdminController{

    static async LoginPostController (req, res, next){
        try {
            const data = await AdminSignInValidation(req.body, res.error);
    
            const admin = await req.db.admins.findOne({
                where: {
                    admin_login: data.login
                }
            })
    
            if(!admin) throw new res.error("Admin is not found")
    
            if(!(compareHash(data.password, admin.admin_password))){
                throw new Error("Password is incorrect")
            } 

            await req.db.sessions.destroy({
                where: {
                    session_user_agent: req.headers["user-agent"] || "Unknown",
                    admin_id: admin.dataValues.admin_id
                }
            })
            
            const session = await req.db.sessions.create({
                session_user_agent: req.headers["user-agent"] || "Unknown",
                admin_id: admin.dataValues.admin_id
            })
    
            let token = await createToken({
                session_id: session.dataValues.session_id
            });

            res.status(201).json({
				ok: true,
				message: "Logged successfully",
				data: {
					token
				},
			});
    
        } catch (error) {
            next(error)
        }
    }

    //-------------------------------------------------------------------------------
}