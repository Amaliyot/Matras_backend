module.exports = (sequelize, Sequelize) => {
    sequelize.define("categories", {
        category_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        category_name: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        category_status: {
            type: Sequelize.ENUM("active", "inactive"),
            allowNull: false
        }
    })
}