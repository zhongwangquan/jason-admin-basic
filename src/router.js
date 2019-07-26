
import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('views/login/index')

Vue.use(Router)



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: login
    }
  ]
})
