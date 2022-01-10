const { AdressValidation } = require("../../modules/validations")

module.exports = class AdressController{
    static async CreateAdressPostControllers(req, res, next){
        try {
            const data = await AdressValidation(req.body, res.error)

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
            
            const new_adress = await req.db.adresses.create({
                adress_name: data.name,
                adress_location: data.location,
                adress_description: data.description,
                adress_status: data.status
            })

            if(!new_adress) throw new res.error(500, "Something went wrong while creating adress!")

            if(req.files.files){
            
                for (let file of files){
                     let file_name = file.md5 + getExtension(file.name)
                    const f = await req.db.adress_photos.create({
                        photo_name: file.md5,
                        photo_ext: getExtension(file.name),
                        adress_id: new_adress.dataValues.adress_id
                    })
            
                    await file.mv(path.join(__dirname, '..', '..', 'public', 'files', 'adressPhotos', file_name))
                }
            }

            res.status(201).json({
                ok: true,
                message: "Adress created succesfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateAdressPostControllers(req, res, next){
        try {
            const data = await AdressValidation(req.body, res.error)

            const isAdress = await req.db.adresses.findOne({
                where: {
                    adress_id: req.params.id
                }
            })

            if(!isAdress) throw new res.error(400, "Adress not found")

            if(req.files){
                const existingFiles = await req.db.adress_photos.findAll({
                    where: {
                        adress_id: isAdress.adress_id
                    }
                })

                if (existingFiles.length === 2) throw new res.error(400, `Adress already has 2 photos`);

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
                   const f = await req.db.adress_photos.create({
                       photo_name: file.md5,
                       photo_ext: getExtension(file.name),
                       adress_id: isAdress.dataValues.adress_id
                   })
           
                   await file.mv(path.join(__dirname, '..', '..', 'public', 'files', 'adressPhotos', file_name))
               }
            }

            const adress = await req.db.adresses.update(
                {
                    adress_name: data.name,
                    adress_location: data.location,
                    adress_description: data.description,
                    adress_status: data.status
                },{
                    where: {
                        adress_id: isAdress.dataValues.adress_id
                    }
                }
            )

            if(!adress) throw new res.error(500, "Something went wrong while updating the adress!")

            res.status(200).json({
                ok: true,
                message: "Adress updated succesfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async DeleteAdressPostControllers(req, res, next){
        try {
            const id = req.params?.id 

            const adress = await req.db.adresses.findOne({
                where: {
                    adress_id: id
                }
            })

            if(!adress) throw new res.error(400, "Adress not found")

            const photos = await req.db.adress_photos.findAll({
                where: {
                    adress_id: adress.dataValues.adress_id
                }
            })

            for(let p of photos){
                fs.unlink(path.join(__dirname, '..', '..', 'public', 'files', 'adressPhotos', `${p.photo_name + p.photo_ext}`))
            }

            await req.db.adresses.destroy({
                where: {
                    adress_id: adress.dataValues.adress_id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Adress deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async AdressesGetController(req, res, next){
        try {
            const adresses = await req.db.adresses.findAll()

            if (!adresses) throw new res.error(400, "Could not get adresses")

            res.status(200).json({
                ok: true,
                data: {
                    adresses
                }
            })
        } catch (error) {
            next(error)
        }
    }
}