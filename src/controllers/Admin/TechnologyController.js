const { TechnologyValidation } = require("../../modules/validations")
const path = require("path")

module.exports = class TechnologiesControllers{
    static async CreateTechnologiesPostControllers(req, res, next){
        try {
            const data = await TechnologyValidation(req.body, res.error)

            if (!req.files.files || !req.body.video) throw new res.error(400, "At least one file (photo or video) required");

            let files = req.files.files
            const allowedTypeForFile = [
                ".png",
                ".jpg",
                ".jpeg",
            ];
            
            if (!Array.isArray(files) && files) {
                files = [files];
            }

            if (files.length > 2) throw new res.error(400, "Too many files. Allowed=2");
        
            files.map(file => {
                if (
                    !allowedTypeForFile.includes(getExtension(file.name))
                ){
                    throw new res.error(400, `${getExtension(file.name)} files are not allowed`)
                }else if (
                    file.size > 3000000
                ){
                    throw new res.error(400, `Files' size is too large. Current=${Math.round(file.size / 1000000)}mb. Limit=3mb`)
                }
            })
            
            const newTechnology = await req.db.technologies.create({
                technology_name: data.name,
                technology_description: data.description,
                technology_video: data.video
            })

            if(!newTechnology) throw new res.error(500, "omething went wrong while creating technology!")

            if(req.files.files){
            
                for (let file of files){
                     let file_name = file.md5 + getExtension(file.name)
                    const f = await req.db.tech_photos.create({
                        photo_name: file.md5,
                        photo_ext: getExtension(file.name),
                        technology_id: newTechnology.dataValues.technology_id
                    })
            
                    await file.mv(path.join(__dirname, '..', '..', 'public', 'files', 'technologyPhotos', file_name))
                }
            }

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
            console.log(isTechnology);
            if(!isTechnology) throw new res.error(400, "Technology not found")

            if(req.files){
                const existingFiles = await req.db.tech_photos.findAll({
                    where: {
                        technology_id: isTechnology.technology_id
                    }
                })

                if (existingFiles.length === 2) throw new res.error(400, `Technology already has 2 photos`);

                let files = req.files.files
                const allowedTypeForFile = [
                    ".png",
                    ".jpg",
                    ".jpeg",
                ];
                
                if (!Array.isArray(files) && files) {
                    files = [files];
                }

                if (files.length > (2 - existingFiles.length)) throw new res.error(400, `Too many files. Sent=${files.length}. Current=${existingFiles.length}. Available=${2 - existingFiles.length}`);
            
                files.map(file => {
                    if (
                        !allowedTypeForFile.includes(getExtension(file.name))
                    ){
                        throw new res.error(400, `${getExtension(file.name)} files are not allowed`)
                    }else if (
                        file.size > 3000000
                    ){
                        throw new res.error(400, `Files' size is too large. Current=${Math.round(file.size / 1000000)}mb. Limit=3mb`)
                    }
                })

                for (let file of files){
                    let file_name = file.md5 + getExtension(file.name)
                   const f = await req.db.tech_photos.create({
                       photo_name: file.md5,
                       photo_ext: getExtension(file.name),
                       technology_id: isTechnology.dataValues.technology_id
                   })
           
                   await file.mv(path.join(__dirname, '..', '..', 'public', 'files', 'technologyPhotos', file_name))
               }
            }

            const technology = await req.db.technologies.update(
                {
                    technology_name: data.name,
                    technology_description: data.description,
                    technology_video: data.video,
                },{
                    where: {
                        technology_id: isTechnology.dataValues.technology_id
                    }
                }
            )

            console.log(technology);

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

            const photos = await req.db.tech_photos.findAll({
                where: {
                    technology_id: technology.dataValues.technology_id
                }
            })

            for(let p of photos){
                fs.unlink(path.join(__dirname, '..', '..', 'public', 'files', 'technologyPhotos', `${p.photo_name + p.photo_ext}`))
            }

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


function getExtension(filename) {
	var i = filename.lastIndexOf(".");
	return i < 0 ? "" : filename.substr(i);
}