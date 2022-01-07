const { where } = require("sequelize/types")
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

    static async UpdateTechnologiesPostControllers(req, res, next){
        try {
            const data = await TechnologyValidation(req.body, res.error)

            const isTechnology = await req.db.technologies.findOne({
                where: {
                    technology_id: req.params.id
                }
            })

            if(isTechnology) throw new res.error(400, "Technology not found")

            const technology = await req.db.technologies.update(
                {
                    technologies_name: data.name,
                    technologies_description: data.description,
                    technologies_video: data.video,
                    where: {
                        technology_id: isTechnology.technology_id
                    }
                }
            )

            if(!technology) throw new res.error(500, "Something went wrong while updateing the technology!")

            res.status(200).json({
                ok: true,
                message: "Technology updated succesfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async DeleteTechnologiesPostControllers(req, res, next){
        try {
            const id = req.params?.id 

            const technology = await req.db.technologies.findOne({
                where: {
                    technology_id: id
                }
            })

            if(!technology) throw new res.error(400, "Technology not found")

            await req.db.technologies.destroy({
                where: {
                    technology_id: technology.technology_id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Technology deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async TechnologiesGetController(req, res, next){
        try {
            const technologies = await req.db.technologies.findAll()

            if (!technologies) throw new res.error(400, "Could not get technologies")

            res.status(200).json({
                ok: true,
                data: {
                    technologies
                }
            })
        } catch (error) {
            next(error)
        }
    }
}