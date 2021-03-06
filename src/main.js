import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/globle.css'

import axios from 'axios'
// 添加请求拦截器添加token
axios.interceptors.request.use((config) => {
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
