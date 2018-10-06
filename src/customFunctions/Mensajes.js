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
		var alerta
		if (error.details[0].context.label == 'value') {
			alerta = 'debe proporcionar porlomenos un articulo'
		} else {
			alerta = 'No se encontraron un caso para este error.'
		}
		res.status(500).json({
			status: 'error',
			msg: alerta
		})
		break
	}
}

const mensajes = {}

mensajes.switchError = switchError

module.exports = mensajes