import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import appstore from './modules/appstore'

const store = new vuex.Store({
  modules: {
    app: appstore
  }
})

export default store
