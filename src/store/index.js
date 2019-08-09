import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import appstore from './modules/appstore'
import user from './modules/user'

const store = new vuex.Store({
  modules: {
    app: appstore,
    user: user
  }
})

export default store
