module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("tech_photos", {
        photo_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        photo_name: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        photo_ext: {
            type: Sequelize.STRING(5),
            allowNull: false
        }
    })
}