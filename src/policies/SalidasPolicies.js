const Joi = require('joi')
const mensajes = require('../customFunctions/Mensajes')

const schema = Joi.array().items(Joi.object().keys({
	codigo: Joi.number().required(),
	cantidad: Joi.number().integer().required()
}).required())

exports.guardar = (req, res, next) => {
	const salida = req.body.map(function (element) {
		return element
	})
	const {
		error
	} = Joi.validate(salida, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		req.salida = salida
		next()
	}
}

exports.actualizar = (req, res, next) => {
	const salida = req.body.map(function (element) {
		return element
	})
	const {
		error
	} = Joi.validate(salida, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		next()
	}
}