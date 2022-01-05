const {Sequelize, DataTypes} = require("sequelize")
const AdminModel = require('../../models/AdminModel')
const CategoryModel = require('../../models/CategoryModel')
const CustomerModel = require('../../models/CustomerModel')
const OrderModel = require('../../models/OrderModel')
const ProductModel = require('../../models/ProductModel')
const TechnologyModel = require('../../models/TechnologyModel')

const sequelize = new Sequelize(process.env.DB_URL, {
    logging: false
})

module.exports = async function postgres(){
    try {
        await sequelize.authenticate();

        let db = {};

        db.admins = await AdminModel(sequelize, Sequelize)
        db.categories = await CategoryModel(sequelize, Sequelize)
        db.customers = await CustomerModel(sequelize, Sequelize)
        db.orders = await OrderModel(sequelize, Sequelize)
        db.products = await ProductModel(sequelize, Sequelize)
        db.technologies = await TechnologyModel(sequelize, Sequelize)

        await sequelize.sync({ force: false })
    } catch (error) {
        
    }
}