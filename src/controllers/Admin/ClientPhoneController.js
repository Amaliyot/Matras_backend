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

    static async DeleteClientPhonePostController(req, res, next){
        let message = "Client phone deleted successfully."
        const id = req.params.id
        const isClientPhone = await req.db.client_phone.findOne({
            where: {
                client_phone_id: id
            }
        })

        if(!isClientPhone) throw new res.error(400,"Client phone is not found")

        const clientPhone = await req.db.client_phone.destroy({
            where: {
                client_phone_id: id
            }
        })

        if(!clientPhone) throw new res.error(500, "Something went wrong while creating client phone!")

        res.status(200).json({
            ok: true,
            message: "Client phone deleted successfully"
        })
    }

    static async ClientPhonesGetController(req, res, next){
        try {
            const client_phones = await req.db.client_phone.findAll()

            if(!client_phones) throw new res.error(400, "Could not get client phones")

            res.status(200).json({
                ok: true,
                data: {
                    client_phones
                }
            })
        } catch (error) {
            next(error)
        }
    }
}