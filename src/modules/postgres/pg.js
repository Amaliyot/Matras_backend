const {Sequelize, DataTypes} = require("sequelize")
const AdminModel = require('../../models/AdminModel')
const CategoryModel = require('../../models/CategoryModel')
const CustomerModel = require('../../models/CustomerModel')
const OrderModel = require('../../models/OrderModel')
const ProductModel = require('../../models/ProductModel')
const ProductPhotoModel = require("../../models/ProductPhotoModel")
const SessionModel = require("../../models/SessionModel")
const TechnologyModel = require('../../models/TechnologyModel')
const TechnologyPhotosModel = require("../../models/TechnologyPhotosModel")
const init = require("./init")
const relations = require("./relations")

const sequelize = new Sequelize(process.env.DB_URL, {
    logging: false
})

async function postgres(){
    try {
        await sequelize.authenticate();

        let db = {};

        await instantiate(db).then(async () => {
            await init(db)
            await relations(db)
        })

        await sequelize.sync({ force: false })

        return db
    } catch (error) {
        console.log("DATABASE_ERROR", error);
    }
}

async function instantiate(db){
    db.admins = await AdminModel(sequelize, Sequelize)
    db.sessions = await SessionModel(sequelize, Sequelize)
    db.categories = await CategoryModel(sequelize, Sequelize)
    db.customers = await CustomerModel(sequelize, Sequelize)
    db.orders = await OrderModel(sequelize, Sequelize)
    db.products = await ProductModel(sequelize, Sequelize)
    db.technologies = await TechnologyModel(sequelize, Sequelize)
    db.photos = await ProductPhotoModel(sequelize, Sequelize)
    db.tech_photos = await TechnologyPhotosModel(sequelize, Sequelize)
}

module.exports = postgres;