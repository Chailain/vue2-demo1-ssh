import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  // 上线一定要关闭，仅仅开发时，辅助报错提醒
  strict: true,
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 小模块注册    keyName随意-模块名：模块对象
    user,
    cart
  }
})
