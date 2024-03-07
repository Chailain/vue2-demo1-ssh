import { getInfo, setInfo } from '@/utils/storage'

// const state = {
//   // {
//   //   token: '',
//   //   // 用户的唯一标识
//   //   userId: ''
//   // }
//   // 从本地存储拿 读取不到也会给默认值
//   // 刷新页面 -> 去初始化vuex的起始的数据
//   userInfo: getInfo()
// }

function state () {
  return {
    userInfo: getInfo()
  }
}

const getters = {
}
const mutations = {
  // obj = {
  //   userId: 10003,
  //   token: "1741f74aed758a688515f72572dc8e37"
  // }
  setUserInfo (state, obj) {
    state.userInfo = obj
    // 持久化本地 存一份到本地
    // 刷新页面 vuex会丢失数据 本地有
    setInfo(obj)
  }
}
const actions = {
  logout (context) {
    // 重置个人信息
    context.commit('setUserInfo', {})
    // 重置购物车
    context.commit('cart/setCartList', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
