<template>
  <div class="search-list">
    <!-- 固定在顶部fixed -->
    <van-nav-bar
      fixed
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search
      v-model="querySearch"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
      @search="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格</div>
    </div>
    <div class="goods-list">
      <goods-item v-for="item in proList" :key="item.goods_id"
        :product="item"
      ></goods-item>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product.js'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  components: { GoodsItem },
  name: 'ListIndex',
  data () {
    return {
      // 默认 加载第一页
      page: 1,
      // 存储 商品列表
      proList: []
    }
  },
  computed: {
    querySearch () {
      // 获取 地址栏的 搜索关键字
      return this.$route.query.search || '搜索商品'
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      // 地址栏 搜索关键字 对应的值   商品名字
      goodsName: this.querySearch,
      // 获取第一页
      page: this.page
    })
    this.proList = list.data
  }
}
</script>

<style lang="less" scoped>
.search-list {
  padding-top: 46px;
  /deep/ .van-icon-arrow-left {
    color: orangered;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }
  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item{
      flex: 1;
      font-size: 16px;
      text-align: center;
    }
  }
  .goods-list {
    background-color: #f6f6f6;
  }
}
</style>
