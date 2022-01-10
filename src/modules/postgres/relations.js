module.exports = async (db) => {
    
    // admins & sessions
    await db.admins.hasMany(db.sessions, {
        foreignKey: {
            name: "admin_id",
            allowNull: false
        }
    })

    await db.sessions.belongsTo(db.admins, {
        foreignKey: {
            name: "admin_id",
            allowNull: false
        }
    })

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

    //  products & photos
    await db.products.hasMany(db.photos, {
        foreignKey: {
            name: "product_id",
            allowNull: false
        }
    })

    await db.photos.belongsTo(db.products, {
        foreignKey: {
            name: "product_id",
            allowNull: false
        }
    })

    //  technologies & tech_photos
    await db.technologies.hasMany(db.tech_photos, {
        foreignKey: {
            name: "technology_id",
            allowNull: false
        }
    })

    await db.tech_photos.belongsTo(db.technologies, {
        foreignKey: {
            name: "technology_id",
            allowNull: false
        }
    })

    //  products & orders
    await db.products.hasMany(db.orders, {
        foreignKey: {
            name: "product_id",
            allowNull: false
        }
    })

    await db.orders.belongsTo(db.products, {
        foreignKey: {
            name: "product_id",
            allowNull: false
        }
    })
}