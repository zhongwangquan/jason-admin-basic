
import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('views/Login/index')
const Home = () => import('views/Home/index')
const Main = () => import('views/Main')
const User = () => import('views/User')
const Menu = () => import('views/Menu')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      name: '首页',
      children: [
        { path: '/main', component: Main, name: '系统介绍' },
        { path: '/user', component: User, name: '用户管理' },
        { path: '/menu', component: Menu, name: '菜单管理' }
      ]
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
