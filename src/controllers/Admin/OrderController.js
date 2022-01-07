module.exports = class OrderController{
    static async OrderCreatePostController(req, res, next){
        try {
            const data = await OrderValidation(req.body, res.error);

            const product = await req.db.products.findOne({
                where: {
                    product_id: data.product_id
                }
            })

            if(!product) throw new res.error(400, "Product not found")

            const new_order = await req.db.orders.create({
                order_customer_name: data.client_name,
                order_customer_phone: data.client_phone,
                order_count: data.product_count,
                product_id: product.product_id
            })

            if(!new_order) throw new res.error(400, "Something went wrong")

            res.status(201).json({
                ok: true,
                message: "Order created successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}