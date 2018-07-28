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

const buscar = {}

buscar.categoria = categoria

module.exports = buscar