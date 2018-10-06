const SalidasPolicies = require('../policies/SalidasPolicies')

module.exports = (router) => {
	// POST single
	router.post('/salidas', SalidasPolicies.guardar)

	// // GET all
	// router.get('/productos', ProductosController.productos)

	// // GET one by id
	// router.get('/productos/:id', ProductosController.producto)

	// // PATCH single
	// router.patch('/productos/:id', ProductosPolicies.actualizar, ProductosController.actualizar)

	// // DELETE single
	// router.delete('/productos/:id', ProductosController.eliminar)
}