
module.exports = (sequelize, Sequelize) => {
    sequelize.define("administrators", {
        admin_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
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