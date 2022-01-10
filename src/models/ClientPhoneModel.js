module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("client_phone", {
        client_phone_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        client_phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}