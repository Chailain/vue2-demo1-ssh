<template>
  <div>
    <router-view />
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { getHomeData } from '@/api/home.js'
// import { getCategoryData } from '@/api/category'

export default {
  // name: 'LayoutIndex'
  name: 'LayoutIndex',
  created () {
    this.getHomeData()
    this.getCategoryList()
  },
  methods: {
    async getHomeData () {
      // const res = await getHomeData()
      // console.log(res)
    },
    async getCategoryList () {
      // const { data: { list } } = await getCategoryData()
      // console.log(list)
    }
  }
}
</script>

<style>

</style>
