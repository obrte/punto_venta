import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import App from './App.vue'
import MostrarProductos from './components/producto/MostrarProducto.vue'
import NuevoProducto from './components/producto/NuevoProducto.vue'
import EditarProducto from './components/producto/EditarProducto.vue'
import MostrarCategorias from './components/categoria/MostrarCategorias.vue'
import NuevaCategoria from './components/categoria/NuevaCategoria.vue'
import EditarCategoria from './components/categoria/EditarCategorias.vue'

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