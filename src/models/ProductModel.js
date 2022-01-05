module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("products", {
        product_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_description: {
            type: Sequelize.TEXT(1024),
            allowNull: false
        },
        product_photos: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true
        },
        product_price: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        product_weight: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        product_size: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_warranty_duration: {
            type: Sequelize.STRING,
            allowNull: true
        },
        product_capacity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        product_isNew: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        product_isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        product_hasDiscount: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        product_discount_price: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    })
}