import { getCartList, changeCount, delSelect } from '@/api/cart'
// import Vue from 'vue'
import { Toast } from 'vant'
// Vue.use(Toast)

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
    },
    // 全选由 小选 联动
    isAllCheck (state) {
      // 检测数组中的所有元素是否都符合指定条件 每一个对象都符合指定条件
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // state.cartList.forEach(item => {
      //   if (item.goods_id === goodsId) {
      //     item.isChecked = !item.isChecked
      //   }
      // })
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      // console.log(flag)
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      // 找到 数字框组件操作的 那一个商品
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      // 本地更新 商品数量
      obj.goods_num = value
    }
  },
  actions: {
    async getCartAction (context) {
      // 购物车商品列表
      const { data } = await getCartList()
      // data.list -> [{},{}]
      data.list.forEach(item => {
        // 数组中的每一个对象（后台返回的数据），都新增isChecked属性
        // isChecked属性 用来控制 <van-checkbox>复选框</van-checkbox>
        item.isChecked = true
      })
      // 把构造好的新数据 存入state.cartList数组
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      // 调用的地方 @/layout/cart.vue 购物车页面
      const { goodsId, value, skuId } = obj
      // ① 先本地修改数据
      context.commit('changeCount', {
        goodsId,
        value
      })
      // ② 再同步到后台
      // 数字框修改数量 更新 购物车商品数量   参数顺序要一致
      await changeCount(goodsId, value, skuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      // 调用 删除购物车商品 方法
      await delSelect(cartIds)
      // state.cartList数组 少了东西
      Toast('删除成功')

      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartAction')
    }
  }
}
export default cartModule
