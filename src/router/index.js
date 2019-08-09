
import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('views/Login/index')
const Home = () => import('views/Home/index')
const Main = () => import('views/Main')
const Menu = () => import('views/Menu')
const err = () => import('views/404')
const Intro = () => import('views/Sys/Intro')
const User = () => import('views/Sys/User')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    //   component: Home,
      name: '首页',
    },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '', component: Intro, name: '介绍'},
            { path: 'sys/user', component: User, name: '用户管理'}
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
