module.exports = class CategoryController{
    static async EditCategoryPostController(req, res, next){
        try {
            const data = await CategoryValidation(req.body, res.error)

            console.log(data);

            const isCategory = await req.db.categories.findOne({
                category_id: req.params.id
            })

            if(!isCategory) throw new res.error(400, "Category is not found")

            const category = await req.db.categories.update(
                {
                    category_name: data.name,
                    category_status: data.status
                },
                {
                    where:{
                        category_id: req.params.id
                    }
                }
            )

            if(!category) throw new res.error(400 , "Something went wrong while updating category!")

            res.status(201).json({
                ok: true,
                message: "category updated succesfully"
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateCategoryPostController(req, res, next){
        try {
            const data = await CategoryValidation(req.body, res.error)

            const new_category = await req.db.categories.create({
                category_name: data.name,
                category_status: data.status
            })

            if (!new_category) throw new res.error(500, "Something went wrong while creating category!")

            res.status(201).json({
                ok: true,
                message: "Category created succesfully"
            })
        } catch (error) {
            next(error)
        }
    }
}