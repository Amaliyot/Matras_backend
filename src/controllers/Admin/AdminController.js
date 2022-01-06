const { CategoryValidation, ProductValidation, AdminSignInValidation } = require("../../modules/validations")
const { compareHash } = require("../../modules/bcrypt")
const { createToken } = require("../../modules/jwt")


module.exports = class AdminController{

    static async LoginPostController (req, res, next){
        try {
            const data = await AdminSignInValidation(req.body, res.error);

            console.log(data);
    
            const admin = await req.db.admins.findOne({
                admin_login: data.login
            })
    
            if(!admin) throw new res.error("Admin is not found")

            console.log(admin);
    
            if(!(compareHash(data.password, admin.admin_password))){
                throw new Error("Password is incorrect")
            } 
    
            let token = await createToken({
                _id: admin.admin_id
            });

            res.status(201).json({
				ok: true,
				message: "Logged successfully",
				data: {
					token,
				},
			});
    
        } catch (error) {
            next(error)
        }
    }

    //-------------------------------------------------------------------------------
}