<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange" lazy-render>
      <van-swipe-item v-for="image in images" :key="image.file_id">
        <!-- <img v-lazy="image" :src="image.external_url" /> -->
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{total}}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <!-- 存在使用头像，不存在使用assets默认头像 -->
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <!-- 昵称 -->
            <div class="name">{{ item.user.nick_name }}</div>
            <!-- 用户对当前商品的评分 -->
            <van-rate :size="16" :value="item.score / 2"
              color="#ffd21e" void-color="#eee"
              void-icon="star"
            />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div @click="$router.push('/')" class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div @click="$router.push('/cart')" class="icon-cart">
        <van-badge :content="cartTotal" v-if="cartTotal > 0">
          <van-icon name="shopping-cart-o"></van-icon>
        </van-badge>
        <span>购物车</span>
      </div>
      <div @click="addFn" class="btn-add">加入购物车</div>
      <div @click="buyFn" class="btn-buy">立刻购买</div>
    </div>

    <!-- 点击加入购物车 唤起 底部弹起的模态面板 自定义面板 -->
    <!-- 弹层标题切换 -->
    <van-action-sheet
      v-model="showPannel"
      :title="mode === 'cart' ? '加入购物车' : '立刻购买'"
    >
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>{{ detail.stock_total }}</span>
              <span>55</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="addCount"></CountBox>
        </div>
        <!-- 有库存 展示以下两个按钮中的一个 -->
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCart">
            加入购物车
          </div>
          <div class="btn now" v-else>立刻购买</div>
        </div>
        <!-- 库存为0没有了 -->
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>

    <my-text></my-text>
  </div>
</template>

<script>
import MyText from '@/components/MyText.vue'
import { getProDetail, getProComments } from '@/api/product'
import defaultImg from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
// 添加商品到购物车
import { addCart } from '@/api/cart'
export default {
  components: { MyText, CountBox },
  name: 'ProDetail',
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      current: 0,
      detail: {},
      // 商品评价的总数
      total: 0,
      // 商品评价的列表
      commentList: [],
      defaultImg,
      // 默认 不展示弹层
      showPannel: false,
      mode: 'cart',
      // 加入购物车中的商品数量
      addCount: 1,
      // 在右上角展示徽标数字或小红点
      cartTotal: 0
    }
  },
  computed: {
    goodsId () {
      // 从地址栏 拿到 动态路由参数
      return this.$route.params.id
    }
  },
  methods: {
    // 每一页轮播结束后触发 当前页的索引index
    onChange (index) {
      this.current = index
    },
    async getProDetail () {
      const { data: { detail } } = await getProDetail(this.goodsId)
      // console.log(detail)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getComments () {
      // 限制展示3条评论
      const { data: { list, total } } = await getProComments(this.goodsId, 3)
      this.commentList = list
      this.total = total
    },
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    async addCart () {
      // 判断用户是否有登录
      if (!this.$store.getters.token) {
        // 确认弹框 展示消息确认弹窗 通过函数调用
        // 标题 文本内容 确认按钮文案 取消按钮文案
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          confirmButtonColor: '#afd',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return
      }
      // '/cart/add' 进行加入购物车操作 选择商品的规格
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast('加入购物车成功')
      // 关闭弹层 ActionSheet动作面板
      this.showPannel = false
    }
  },
  created () {
    // 商品详情页
    this.getProDetail()
    // 获取商品评论
    this.getComments()
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  // .desc {
  //   width: 100%;
  //   overflow: scroll;
  //   img {
  //     display: block;
  //     width: 100%!important;
  //   }
  // }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .icon-cart {
      padding: 0 6px;
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹出层 自定义 样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>
