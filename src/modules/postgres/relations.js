module.exports = async (db) => {

    // categories & products
    await db.categories.hasMany(db.products, {
        foreignKey: {
            name: "category_id",
            allowNull: false
        }
    })

    await db.products.belongsTo(db.categories, {
        foreignKey: {
            name: "category_id",
            allowNull: false
        }
    })
}