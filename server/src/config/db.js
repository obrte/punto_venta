/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
*/
const Sequelize = require('sequelize')
const sequelize = new Sequelize('punto_venta', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

//Objeto db que contendrá todos los modelos/tablas de la Base de Datos
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//modelos
db.productos = require('../models/Productos')(sequelize, Sequelize)
db.categorias = require('../models/Categorias')(sequelize, Sequelize)

// /** 
//  *!Relaciones
//  **/
// //! Producto//Categoria
db.productos.belongsTo(db.categorias, { foreignKey: 'idCategoria', as: 'categoria' })
db.categorias.hasMany(db.productos, { foreignKey: 'idCategoria', as: 'productos' })

module.exports = db