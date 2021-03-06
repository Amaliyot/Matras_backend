const { CategoryValidation } = require("../../modules/validations");

module.exports = class CategoryController{
    static async RemoveCategoryController(req, res, next){
        try {
            let message = 'Category deleted successfully.'
            let id = req.params.id
            const isCategory = await req.db.categories.findOne({
                where: {
                    category_id: id
                }
            })

            if(!isCategory) throw new res.error(400, "Category is not found")
            
            await req.db.categories.destroy({
                where: {
                    category_id: isCategory.dataValues.category_id
                }
            })

            res.status(200).json({
                ok: true,
                message: "Categoty deleted successfully"
            })
        } catch (error) {
            next(error)
        }

    }
//------------------------------------------------------------------------------------
    static async EditCategoryPostController(req, res, next){
        try {
            const data = await CategoryValidation(req.body, res.error)

            const isCategory = await req.db.categories.findOne({
                where: {
                    category_id: req.params.id
                }
            })

            if(!isCategory) throw new res.error(400, "Category is not found")

            const category = await req.db.categories.update(
                {
                    category_name: data.name,
                    category_status: data.status,
                },{
                    where:{
                        category_id: isCategory.dataValues.category_id
                    }
                }
                )

            if(!category) throw new res.error(500 , "Something went wrong while updating category!")

            res.status(200).json({
                ok: true,
                message: "Category updated succesfully"
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateCategoryPostController(req, res, next){
        try {
            const data = await CategoryValidation(req.body, res.error)

            const existance = await req.db.categories.findOne({
                where: {
                    category_name: data.name
                }
            })
            
            if (existance) throw new res.error(500, "Category already exists!")

            const new_category = await req.db.categories.create({
                category_name: data.name,
                category_status: data.status,
            })

            if (!new_category) throw new res.error(500, "Something went wrong while creating category!")

            res.status(201).json({
                ok: true,
                message: "Category created succesfully",
                data: {
                    category: new_category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async CategoriesGetController(req, res, next){
        try {
            const categories = await req.db.categories.findAll()

            if (!categories) throw new res.error(400, "Could not get categories")

            res.status(200).json({
                ok: true,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
}