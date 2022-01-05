module.exports = (sequelize, Sequelize) => {
    sequelize.define("customers", {
        customer_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true,
            allowNull: false
        },
        customer_serial_id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        customer_phone: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}