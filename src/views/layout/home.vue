<template>
  <div class="home-page-container">
    <div class="header-nav-bar">
      <van-nav-bar
        title="xx商城"
      />
    </div>

    <div class="search-input">
      <van-search
        placeholder="请输入搜索关键词"
        shape="round"
        background="#ccc"
        @search="$router.push('/search')"
      />
    </div>

    <div class="swiper-box">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
          <img :src="item.imgUrl" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="grid-box">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="item in navList" :key="item.imgUrl"
          :icon="item.imgUrl" :text="item.text">
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="goods-list">
        <GoodsItem
          v-for="item in proList"
          :key="item.goods_id"
          :product="item">
        </GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home.js'

export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      // 轮播
      bannerList: [],
      // 导航
      navList: [],
      // 商品
      proList: []
    }
  },
  created () {
    this.getHomeData()
  },
  methods: {
    async getHomeData () {
      const { data: { pageData } } = await getHomeData()
      console.log(pageData)
      this.bannerList = pageData.items[1].data
      this.navList = pageData.items[4].data
      this.proList = pageData.items[6].data
    }
  }
}
</script>

<style lang="less" scoped>
.header-nav-bar {
  .van-nav-bar{
    background-color: rgb(206, 25, 55);
    /deep/ .van-nav-bar__title {
      color: white;
    }
  }
}

.swiper-box {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    height: 185px;
    img {
      width: 100%;
      height: 185px;
    }
  }
}

.main {
  img {
    width: 100%;
  }
}

.guess {
  .guess-title {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .goods-list {
    background-color: #f6f6f6;
  }
}
</style>
