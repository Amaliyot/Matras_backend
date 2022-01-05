
module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("administrators", {
        admin_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false
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