const switchError = (error, res) => {
	switch (error.details[0].context.key) {
	case 'idProducto':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir el Producto.'
		})
		break
	case 'nombre':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir un nombre.'
		})
		break
	case 'email':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir un correo.'
		})
		break
	case 'password':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir un password.'
		})
		break
	case 'activo':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe proporcionar el campo activo.'
		})
		break
	case 'descripcion':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir un nombre corto.'
		})
		break
	default:
		res.status(500).json({
			status: 'error',
			msg: 'No se encontraron un caso para este error.'
		})
		break
	}
}

const mensajes = {}

mensajes.switchError = switchError

module.exports = mensajes