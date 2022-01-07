module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("technologies", {
        technology_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        technology_name: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        technology_description: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        technology_video: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}