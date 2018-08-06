const db = require('../config/db')
const buscar = require('../customFunctions/Buscar')

//POST single
exports.guardar = (req, res) => {
	db.categorias
		.create(req.body.categoria)
		.then(categoria => {
			res.status(201).json(categoria)
		})
		.catch(err => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET one por id
exports.categoria = (req, res) => {
	buscar
		.categoria(req.params.id)
		.then(categoria => {
			res.status(200).json(categoria)
		})
		.catch(err => {
			res.json(err)
		})
}

// GET all con TODO
exports.categorias = (req, res) => {
	db.categorias
		.findAll({
			include: [
				{
					model: db.productos,
					attributes: ['nombre', 'descripcion'],
					as: 'productos'
				}
			]
		})
		.then(categorias => {
			console.log(categorias.length)
			if (categorias.length > 0) {
				console.log('Categorias IF')
				res.status(200).json(categorias)
			} else {
				console.log('Categorias ELSE')
				res.status(404).json({
					status: 'Alerta',
					msg: 'No hay categorias.'
				})
			}
		})
		.catch(err => {
			console.log('CATCH')
			res.json(err)
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.categorias
		.update(req.body.categoria, {
			where: {
				idCategoria: req.params.id
			}
		})
		.then(categoriaActualizada => {
			if (categoriaActualizada > 0) {
				buscar.categoria(req.params.id).then(categoria => {
					res.status(200).json(categoria)
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Categoria no actualizada.'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.categorias
		.destroy({
			where: {
				idCategoria: req.params.id
			}
		})
		.then(categoriaEliminada => {
			if (categoriaEliminada > 0) {
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
