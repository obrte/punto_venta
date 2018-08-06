const db = require('../config/db')

//POST single
exports.guardar = (req, res) => {
	res.json(req)
}

// GET one por id
exports.producto = (req, res) => {
	res.json(req)
}

// GET all con TODO
exports.productos = (req, res) => {
	console.log('productos')
	db.productos
		.findAll({
			include: [
				{
					model: db.categorias,
					attributes: ['nombre'],
					as: 'categoria'
				}
			]
		})
		.then(productos => {
			console.log(productos)
			if (productos == []) {
				console.log('IF')
				res.status(200).json(productos)
			} else {
				console.log('ELSE')
				res.status(404).json({
					status: 'Alerta',
					msg: 'No hay productos.'
				})
			}
		})
		.catch(err => {
			res.json(err)
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	res.json(req)
}

// DELETE single
exports.eliminar = (req, res) => {
	res.json(req)
}
