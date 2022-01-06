module.exports = class ProductController{
    static async CreateProductPostController(req, res, next){
        try {
            const data = await ProductValidation(req.body, res.error)

            const category = await req.db.categories.findOne({
                where: {
                    category_id: data.category
                }
            })

            if(!category) throw new res.error(400, "Category not found")

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
                    allowedTypeForFile.includes(getExtension(file.name))
                ){
                    throw new res.error(400, `${getExtension(file.name)} files are not allowed`)
                }else if (
                    file.size > 100 * 1024000
                ){
                    throw new res.error(400, `Files are too large`)
                }
            })

            const new_product = await req.db.categories.create({
                photos: data.photos,
                product_name: data.name,
                product_price: data.price,
                product_weight: data.weight,
                product_size: data.size,
                product_warranty_duration: data.warranty,
                product_capacity: data.capacity,
                product_isNew: data.isNew,
                product_isActive: data.isActive,
                product_hasDiscount: data.hasDiscount,
                product_discount_price: data.discountPrice,
                category_id: category.category_id,
            })

            if (!new_product) throw new res.error(500, "Something went wrong while creating category!")

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