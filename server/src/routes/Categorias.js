const CategoriasPolicies = require('../policies/CategoriasPolicies')
const CategoriasController = require('../controllers/CategoriasController')

module.exports = (router) => {
	// POST single
	router.post('/categorias', CategoriasPolicies.guardar, CategoriasController.guardar)

	// GET all
	router.get('/categorias', CategoriasController.categorias)

	// GET one by id
	router.get('/categorias/:id', CategoriasController.categoria)

	// PATCH single
	router.patch('/categorias/:id', CategoriasPolicies.actualizar, CategoriasController.actualizar)

	// DELETE single
	router.delete('/categorias/:id', CategoriasController.eliminar)
}