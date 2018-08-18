const Joi = require('joi')
const db = require('../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../customFunctions/Mensajes')

const schema = {
	codigo: Joi.string().required(),
	nombre: Joi.string().required(),
	descripcion: Joi.string().required(),
	idCategoria: Joi.string().required(),
	precio: Joi.number()
		.positive()
		.precision(2)
		.required(),
	stock: Joi.number().integer()
}

const datosProducto = req => {
	return {
		codigo: req.body.producto.codigo.toUpperCase().trim(),
		nombre: req.body.producto.nombre.toUpperCase().trim(),
		descripcion: req.body.producto.descripcion.toUpperCase().trim(),
		idCategoria: req.body.producto.idCategoria,
		precio: req.body.producto.precio,
		stock: req.body.producto.stock
	}
}

exports.guardar = (req, res, next) => {
	const producto = datosProducto(req)
	req.producto = producto
	const {
		error
	} = Joi.validate(producto, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.productos
			.findOne({
				where: {
					[Op.or]: [{
						codigo: producto.codigo
					},
					{
						descripcion: producto.descripcion
					}
					]
				}
			})
			.then(conflictoProducto => {
				if (conflictoProducto) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe el codigo o un producto con la misma descripción.'
					})
				} else {
					next()
				}
			})
	}
}

exports.actualizar = (req, res, next) => {
	const producto = datosProducto(req)
	req.producto = producto
	const {
		error
	} = Joi.validate(producto, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.productos
			.findOne({
				where: {
					[Op.or]: [{
						codigo: producto.codigo
					},
					{
						descripcion: producto.descripcion
					}
					],
					codigo: {
						[Op.ne]: req.params.id
					}
				}
			})
			.then(conflictoProducto => {
				if (conflictoProducto) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe el codigo o un producto con la misma descripción.'
					})
				} else {
					next()
				}
			})
	}
}