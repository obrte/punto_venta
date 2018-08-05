import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import App from './App.vue'
import MostrarProductos from './producto/MostrarProducto.vue'
import NuevoProducto from './producto/NuevoProducto.vue'
import EditarProducto from './producto/EditarProducto.vue'
import MostrarCategorias from './categoria/MostrarCategorias.vue'
import NuevaCategoria from './categoria/NuevaCategoria.vue'
import EditarCategoria from './categoria/EditarCategorias.vue'

const routes = [{
	name: 'MostrarProductos',
	path: '/productos',
	component: MostrarProductos
},
{
	name: 'NuevoProducto',
	path: '/productos/crear',
	component: NuevoProducto
},
{
	name: 'EditarProducto',
	path: '/productos/editar/:id',
	component: EditarProducto
},
{
	name: 'MostrarCategorias',
	path: '/categorias',
	component: MostrarCategorias
},
{
	name: 'NuevaCategoria',
	path: '/categorias/crear',
	component: NuevaCategoria
},
{
	name: 'EditarCategoria',
	path: '/categorias/editar/:id',
	component: EditarCategoria
}
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})
new Vue(Vue.util.extend({
	router
}, App)).$mount('#app')