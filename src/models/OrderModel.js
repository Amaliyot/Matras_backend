module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("orders", {
        order_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        order_serial_id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        order_customer_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order_customer_phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order_count: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        order_status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}