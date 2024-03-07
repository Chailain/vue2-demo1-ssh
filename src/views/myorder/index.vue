<template>
  <div class="order">
    <!-- 导航栏 -->
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <!-- 标签页 -->
    <!-- 开启粘性布局，标签页滚动到顶部时会自动吸顶。 -->
    <!-- 通过名称匹配 标签指定name属性 v-model的值为当前标签的name -->
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <!-- 订单 -->
    <OrderListItem
      v-for="item in list"
      :key="item.order_id"
      :item="item">
    </OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      // 订单类型
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      // 共total_num件商品
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
    }
  },
  watch: {
    // 标签页 标签
    // 标签发生切换时
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
