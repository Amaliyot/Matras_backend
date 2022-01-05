const JOI = require('joi')

module.exports = class Validations {
    static async AdminSignInValidation(data, CustomError) {
        return await JOI.object({
            login: JOI.number().required().error(new CustomError(400, "Phone number is invalid")),
            password: JOI.string().required().min(5).error(new CustomError(400, "Password is invalid"))
        }).validateAsync(data)
    }

    static async CategoryValidation(data, CustomError){
        return await JOI.object({
            name: JOI.string().required().max(32).error(new CustomError(400, "Category name is invalid")),
            status: JOI.boolean().required().error(new CustomError(400, "Status is invalid"))
        })
    }
}