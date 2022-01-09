const fs = require("fs/promises")
const path = require("path")

module.exports = class FilesController{

    static async ProductPhotosGetController(req, res, next){
        try {
            const photos = await req.db.photos.findAll()

            if(!photos) throw new res.error(400, "Files not found")

            res.status(200).json({
                ok: true,
                data: {
                    photos
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async TechnologyPhotosGetController(req, res, next){
        try {
            const photos = await req.db.tech_photos.findAll()

            if(!photos) throw new res.error(400, "Files not found")

            res.status(200).json({
                ok: true,
                data: {
                    photos
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async DeleteProductPhotoPostController(req, res, next){
        try {
            const photo = await req.db.photos.findOne({
                where: {
                    photo_id: req.params.id
                }
            })

            if(!photo) throw new res.error(400, "File not found")

            await req.db.photos.destroy({
                where: {
                    photo_id: photo.photo_id
                }
            })
            fs.unlink(path.join(__dirname, '..', '..', 'public', 'files', 'productPhotos', `${photo.photo_name + photo.photo_ext}`))

            res.status(200).json({
                ok: true,
                message: "File deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async DeleteTechnologyPhotoPostController(req, res, next){
        try {
            const photo = await req.db.tech_photos.findOne({
                where: {
                    photo_id: req.params.id
                }
            })

            if(!photo) throw new res.error(400, "File not found")

            await req.db.tech_photos.destroy({
                where: {
                    photo_id: photo.photo_id
                }
            })
            fs.unlink(path.join(__dirname, '..', '..', 'public', 'files', 'technologyPhotos', `${photo.photo_name + photo.photo_ext}`))
            
            res.status(200).json({
                ok: true,
                message: "File deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}