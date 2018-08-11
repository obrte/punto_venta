const db = require('../config/db')

const categoria = (id) => {
	return new Promise((resolve, reject) => {
		db.categorias.find({
			where: {
				idCategoria: id
			},
			include: [{
				model: db.productos,
				attributes: ['nombre', 'descripcion'],
				as: 'productos'
			}],
		})
			.then(categoria => {
				resolve(categoria)
			})
			.catch((err) => reject(err))
	})
}

const producto = (id) => {
	return new Promise((resolve, reject) => {
		db.productos.find({
			where: {
				idProducto: id
			},
			include: [{
				model: db.categorias,
				attributes: ['idCategoria', 'nombre', 'descripcion'],
				as: 'categoria'
			}],
		})
			.then(productos => {
				resolve(productos)
			})
			.catch((err) => reject(err))
	})
}

const buscar = {}

buscar.categoria = categoria
buscar.producto = producto

module.exports = buscar