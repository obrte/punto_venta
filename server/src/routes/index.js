const routes = [
	require('./Productos'),
	require('./Categorias')
]

// Add access to the app and db objects to each route
module.exports = function router(app) {
	return routes.forEach((route) => {
		route(app)
	})
}