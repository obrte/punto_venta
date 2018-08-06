const Joi = require('joi')
const db = require('../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../customFunctions/Mensajes')

const schema = {
	nombre: Joi.string().required(),
	descripcion: Joi.string().required()
}

const datosCategoria = req => {
	return {
		nombre: req.body.categoria.nombre,
		descripcion: req.body.categoria.descripcion
	}
}

exports.guardar = (req, res, next) => {
	const categoria = datosCategoria(req)
	const { error } = Joi.validate(categoria, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.categorias
			.findOne({
				where: {
					nombre: categoria.nombre,
					descripcion: categoria.descripcion
				}
			})
			.then(conflictoCategoria => {
				if (conflictoCategoria) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe una categoria con los mismos datos.'
					})
				}
			})
		next()
	}
}

exports.actualizar = (req, res, next) => {
	const categoria = datosCategoria(req)
	const { error } = Joi.validate(categoria, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.categorias
			.findOne({
				where: {
					nombre: categoria.nombre,
					descripcion: categoria.descripcion,
					idCategoria: {
						[Op.ne]: categoria.idCategoria
					}
				}
			})
			.then(conflictoCategoria => {
				if (conflictoCategoria) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe una categoria con los mismos datos.'
					})
				}
			})
		next()
	}
}
