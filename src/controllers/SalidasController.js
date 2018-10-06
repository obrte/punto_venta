const db = require('../config/db')
const buscar = require('../customFunctions/Buscar')

//POST single
exports.salida = (req, res) => {
	var cont = 0
	req.salida.forEach(element => {
		db.productos.find({
			where: {
				codigo: element.codigo
			}
		})
			.then(producto => {
				db.productos.update({
					stock: producto.stock - element.cantidad
				}, {
					where: {
						codigo: element.codigo
					}
				})
					.then(productoRestado => {
						cont += productoRestado
						if (cont == req.salida.length) {
							res.status(200).json({
								status: 'success',
								msg: 'Salida Correcta',
							})
						}
					})
					.catch(err => {
						res.status(400).json({
							status: 'error',
							msg: 'Error al crear',
							error: {
								name: err.name,
								code: err.parent.code
							}
						})
					})
			})
			.catch(err => {
				res.status(400).json({
					status: 'error',
					msg: 'Error al crear',
					error: {
						name: err.name,
						code: err.parent.code
					}
				})
			})
	})
}

// GET one por id
exports.producto = (req, res) => {
	buscar.producto(req.params.id)
		.then(producto => {
			res.status(200).json(producto)
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET all con TODO
exports.productos = (req, res) => {
	db.productos.findAll({
		include: [{
			model: db.categorias,
			attributes: ['idCategoria', 'nombre', 'descripcion'],
			as: 'categoria'
		}]
	})
		.then(productos => {
			if (productos.length > 0) {
				res.status(200).json(productos)
			} else {
				res.status(400).json({
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
	db.productos.update(req.producto, {
		where: {
			codigo: req.params.id
		}
	})
		.then(productoActualizada => {
			if (productoActualizada > 0) {
				buscar.producto(req.params.id).then(producto => {
					res.status(200).json(producto)
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Producto no actualizada.'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.productos.destroy({
		where: {
			idProducto: req.params.id
		}
	})
		.then(productoEliminada => {
			if (productoEliminada > 0) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa',
					id: req.params.id
				})
			} else {
				res.status(400).json({
					status: 'error',
					msg: 'No encontrado'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al eliminar, verifica que no tenga dependencias',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}