import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import App from './App2.vue'
import Productos from './components/Productos.vue'
import Categorias from './components/Categorias.vue'
import Salidas from './components/Salidas.vue'
import Test from './components/test.vue'

const routes = [{
	name: 'Productos',
	path: '/productos',
	component: Productos
},
{
	name: 'Categorias',
	path: '/categorias',
	component: Categorias
},
{
	name: 'Salidas',
	path: '/salidas',
	component: Salidas
},
{
	name: 'Test',
	path: '/test',
	component: Test
}
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})
new Vue(Vue.util.extend({
	router
}, App)).$mount('#app')