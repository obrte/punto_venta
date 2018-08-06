import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const baseURL = 'http://localhost:3000'

if (baseURL) {
    Vue.axios.defaults.baseURL = baseURL
}

export default Vue.axios
