const switchError = (error, res) => {
	switch (error.details[0].context.key) {
	case 'codigo':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir el codigo del producto.'
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
			msg: 'Debe introducir una descripción.'
		})
		break
	case 'idCategoria':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe introducir una categoria.'
		})
		break
	case 'stock':
		res.status(400).json({
			status: 'Alerta',
			msg: 'Debe iproporcionar el stock.'
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