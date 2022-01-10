const { ClientPhoneValidation } = require("../../modules/validations")

module.exports = class ClientPhoneController{
    static async CreateClientPhonePostController(req, res, next){
        const data = await ClientPhoneValidation(req.body, res.error)

        const new_client_phone = await req.db.client_phone.create({
            client_phone_number: data.phone
        })

        if(!new_client_phone) throw new res.error(500, "Something went wrong while creating client phone!")

        res.status(200).json({
            ok: true,
            message: "Client phone created succesfully"
        })
    }

    
}