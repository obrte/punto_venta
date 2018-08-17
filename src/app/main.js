import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import App from './App.vue'
import Productos from './components/Productos.vue'
import Categorias from './components/Categorias.vue'

const routes = [{
	name: 'Productos',
	path: '/productos',
	component: Productos
},
{
	name: 'Categorias',
	path: '/categorias',
	component: Categorias
}
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})
new Vue(Vue.util.extend({
	router
}, App)).$mount('#app')