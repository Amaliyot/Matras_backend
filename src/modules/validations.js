const JOI = require('joi')

module.exports = class Validations {
    static async AdminSignInValidation(data, CustomError) {
        return await JOI.object({
            login: JOI.string().required().error(new CustomError(400, "Login is invalid")),
            password: JOI.string().required().error(new CustomError(400, "Password is invalid"))
        }).validateAsync(data)
    }

    static async CategoryValidation(data, CustomError){
        return await JOI.object({
            name: JOI.string().required().max(32).error(new CustomError(400, "Category name is invalid")),
            status: JOI.boolean().required().error(new CustomError(400, "Status is invalid"))
        }).validateAsync(data)
    }

    static async ProductValidation(data, CustomError){
        return await JOI.object({
            photos: JOI.array().error(new CustomError(400, "Size is invalid")),
            name: JOI.string().required().max(32).error(new CustomError(400, "Category name is invalid")),
            price: JOI.number().required().error(new CustomError(400, "Price is invalid")),
            weight: JOI.number().required().error(new CustomError(400, "Weight is invalid")),
            size: JOI.string().required().error(new CustomError(400, "Size is invalid")),
            warranty: JOI.string().error(new CustomError(400, "Warranty is invalid")),
            capacity: JOI.number().required().error(new CustomError(400, "Capacity is invalid")),
            isNew: JOI.boolean().required().error(new CustomError(400, "Condition is invalid")),
            isActive: JOI.boolean().required().error(new CustomError(400, "Status is invalid")),
            hasDiscount: JOI.boolean().required().error(new CustomError(400, "Discount status is invalid")),
            discountPrice: JOI.number().required().error(new CustomError(400, "Discount price is invalid")),
        }).validateAsync(data)
    }
}