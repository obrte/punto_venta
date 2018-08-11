const ProductosPolicies = require('../policies/ProductosPolicies')
const ProductosController = require('../controllers/ProductosController')

module.exports = (router) => {
	// POST single
	router.post('/productos', ProductosPolicies.guardar, ProductosController.guardar)

	// GET all
	router.get('/productos', ProductosController.productos)

	// GET one by id
	router.get('/productos/:id', ProductosController.producto)

	// PATCH single
	router.patch('/productos/:id', ProductosPolicies.actualizar, ProductosController.actualizar)

	// DELETE single
	router.delete('/productos/:id', ProductosController.eliminar)
}