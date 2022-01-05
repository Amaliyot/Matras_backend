module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("categories", {
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
        category_description: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        category_photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        category_video: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}