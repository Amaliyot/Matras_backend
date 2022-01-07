const path = require("path")
const {ProductValidation} = require("../../modules/validations")

module.exports = class ProductController{
    static async DeleteProductPostController(req, res, next){
        try {
            const data = await ProductValidation(req.body, res.error)

            const isProduct = await req.db.products.findOne({
                product_id: req.params.id
            })

            if(!isProduct) throw new res.error(400, "Product not found")

            const product = await req.db.products.update({
                where: {
                    product_id: req.params.id
                }
            })

            if(!product) throw new res.error(500, "Something went wrong while deleting category!")

            res.status(201).json({
                ok: true,
                message: "Product deleted succesfully"
            })
        } catch (error) {
            next(error)
        }
    }
//-------------------------------------------------------------------------
    static async CreateProductPostController(req, res, next){
        try {
            const data = await ProductValidation(req.body, res.error)

            const category = await req.db.categories.findOne({
                where: {
                    category_id: data.category
                }
            })

            console.log(category);

            if(!category) throw new res.error(400, "Category not found")

            const new_product = await req.db.products.create({
                product_name: data.name,
                product_description: data.description,
                product_price: data.price,
                product_weight: data.weight,
                product_size: data.size,
                product_warranty_duration: data.warranty,
                product_capacity: data.capacity,
                product_isNew: data.isNew,
                product_isActive: data.isActive,
                product_hasDiscount: data.hasDiscount,
                product_discount_price: data.discountPrice,
                category_id: category.dataValues.category_id,
            })

            if (!new_product) throw new res.error(500, "Something went wrong while creating category!")

            const allowedTypeForFile = [
				".png",
				".jpg",
				".jpeg",
			];

            let files = req.files?.files
            
            if (!Array.isArray(files) && files) {
				files = [req.files?.files];
			}

            if (!files) throw new res.error(400, "Files not found");
			if (files?.length > 4) throw new res.error(400, "Too many files");

            files.map(file => {
                if (
                    !allowedTypeForFile.includes(getExtension(file.name))
                ){
                    throw new res.error(400, `${getExtension(file.name)} files are not allowed`)
                }else if (
                    file.size > 100 * 1024000
                ){
                    throw new res.error(400, `Files are too large`)
                }
            })

            console.log(files);

            for (let file of files){
                 let file_name = file.md5 + getExtension(file.name)
                const f = await req.db.photos.create({
                    photo_name: file.md5,
                    photo_ext: getExtension(file.name),
                    product_id: new_product.dataValues.product_id
                })

                await file.mv(path.join(__dirname, '..', '..', 'public', 'files', 'productPhotos', file_name))
            }

            res.status(201).json({
                ok: true,
                message: "Product created succesfully"
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