import { getCartList } from '@/api/cart'

const cartModule = {
  namespaced: true,
  state () {
    return {
      // 用arr维护 购物车
      cartList: []
    }
  },
  getters: {
    // 购物车里   共？件商品 不管是否选中
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品项 选中的商品列表
    selCartList (state) {
      // 保留 复选框选中项
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      // 返回 累加的结果
      return getters.selCartList.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // data.list -> [{},{}]
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  }
}
export default cartModule
