module.exports = class ProductController{
    static async CreateProductPostController(req, res, next){
        try {
            const data = await ProductValidation(req.body, res.error)

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