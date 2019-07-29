import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'

Vue.use(ElementUI)

import api from './http/index'
Vue.use(api)

import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
