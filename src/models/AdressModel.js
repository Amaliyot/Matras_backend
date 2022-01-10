module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("adresses", {
        adress_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        adress_name: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        adress_location: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        adress_description: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        adress_status: {
            type: Sequelize.ENUM("active", "inactive"),
            allowNull: false
        }
    })
}