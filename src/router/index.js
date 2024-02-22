import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('../views/layout/home.vue') },
      { path: '/category', component: () => import('../views/layout/category.vue') },
      { path: '/cart', component: () => import('../views/layout/cart.vue') },
      { path: '/user', component: () => import('../views/layout/user.vue') }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search')
  },
  {
    path: '/searchlist',
    component: () => import('../views/search/list.vue')
  },
  {
    path: '/prodetail/:id',
    component: () => import('../views/prodetail')
  },
  {
    path: '/pay',
    component: () => import('../views/pay')
  },
  {
    path: '/myorder',
    component: () => import('../views/myorder')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  // 自定义<router-link></router-link>默认的高亮类名 关键字link配置
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

export default router
