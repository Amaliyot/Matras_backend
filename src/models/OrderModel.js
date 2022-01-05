module.exports = (sequelize, Sequelize) => {
    sequelize.define("orders", {
        order_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        order_serial_id: {
            type: DataTypes.INTEGER,
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
        }
    })
}