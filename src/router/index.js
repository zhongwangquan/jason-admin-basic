
import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('views/Login/index')
const Home = () => import('views/Home/index')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: login
    }
  ]
})


router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user')
  if (to.path == '/login') {
    if (user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!user) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
