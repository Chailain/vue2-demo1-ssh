import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import MyText from '@/components/MyText.vue'
// 首页相关 用户频繁访问 采用默认加载
import Layout from '@/views/layout'
import HomeIndex from '@/views/layout/home.vue'
import CategoryPage from '@/views/layout/category.vue'
import CartIndex from '@/views/layout/cart.vue'
import UserPage from '@/views/layout/user.vue'

const Login = () => import('@/views/login')

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
      { path: '/home', component: HomeIndex },
      { path: '/category', component: CategoryPage },
      { path: '/cart', component: CartIndex },
      { path: '/user', component: UserPage }
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
    name: 'prodetail',
    component: () => import('../views/prodetail')
  },
  {
    path: '/pay',
    component: () => import('../views/pay')
  },
  {
    path: '/myorder',
    component: () => import('../views/myorder')
  },
  {
    path: '/text',
    component: MyText
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  // 自定义<router-link></router-link>默认的高亮类名 关键字link配置
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

const authUrl = ['/pay', '/myorder']
// 全局前置守卫 路由信息对象to,from
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  // 要访问的path
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    // 如果已经登录，则直接进入对应的路由
    next()
  } else {
    // 如果未登录，则跳转到登录页面
    next('/login')
  }
})

export default router
