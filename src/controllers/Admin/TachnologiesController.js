const { TechnologyValidation } = require("../../modules/validations")

module.exports = class TechnologiesControllers{
    static async CreateTechnologiesPostControllers(req, res, next){
        try {
            const data = await TechnologyValidation(req.body, res.error)
            
            const newTechnology = await req.db.technologies.create({
                technologies_name: data.name,
                technologies_description: data.description,
                technologies_video: data.video
            })

            if(!newTechnology) throw new res.error(500, "omething went wrong while creating technology!")

            res.status(201).json({
                ok: true,
                message: "Technology created succesfully"
            })
        } catch (error) {
            next(error)
        }
    }

}