
module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("admins", {
        admin_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true
        },
        admin_login: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        admin_password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}