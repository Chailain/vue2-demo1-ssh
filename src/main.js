import Vue from 'vue'
import App from './App.vue'
// db>index.json-资源管理器-右键-终端-npm run mock
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'

Vue.config.productionTip = false

new Vue({
  // 初始化Vue实例，并传入router和store两个参数
  router,
  store,
  // 渲染App组件
  render: h => h(App)
}).$mount('#app')
