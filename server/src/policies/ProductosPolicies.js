const Joi = require('joi')
//const db = require('../config/db')
//const Op = db.Sequelize.Op
const mensajes = require('../customFunctions/Mensajes')

const schema = {
	nombre: Joi.string().required(),
	descripcion: Joi.string().required(),
	idCategoria: Joi.number().integer(),
	stock: Joi.number().integer()
}

const datosProducto = (req) => {
	return {
		nombre: req.body.organizacion.nombre,
		descripcion: req.body.organizacion.descripcion,
		idCategoria: req.body.organizacion.idCategoria,
		stock: req.body.organizacion.stock
	}
}

exports.guardar = (req, res, next) => {
	const producto = datosProducto(req)
	const {
		error
	} = Joi.validate(producto, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		res.status(400).json({
			status: 'error',
			msg: 'El nombre o nombre corto ya existe.'
		})
		next()
	}
}

exports.actualizar = (req, res, next) => {
	const producto = datosProducto(req)
	const {
		error
	} = Joi.validate(producto, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		res.json(req)
		next()
	}
}