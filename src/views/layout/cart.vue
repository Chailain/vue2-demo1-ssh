<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- ① 用户已登录 返回[{...}]arr有对象 -->
    <div class="cart-box" v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{ cartTotal || 0 }}</i>件商品</span>
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <!-- 图标大小，默认单位为 px -->
          <van-checkbox
            :value="item.isChecked"
            @click="toggleCheck(item.goods_id)"
            icon-size="18"
          ></van-checkbox>
          <div class="show" @click="$router.push(`/prodetail/${item.goods_id}`)">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">
              {{ item.goods.goods_name }}
            </span>
            <span class="bottom">
              <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
              <count-box
                @input="value => changeCount(value, item.goods_id, item.goods_sku_id)"
                :value="item.goods_num">
              </count-box>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div @click="toggleAllCheck" class="all-check">
          <van-checkbox :value="isAllCheck" icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{ selPrice }}</i></span>
          </div>
          <div v-if="!isEdit" class="goPay"
            :class="{ disabled: selCount === 0 }"
            @click="goPay"
          >
            结算({{ selCount }})
          </div>
          <div v-else class="delete"
            :class="{ disabled: selCount === 0 }"
            @click="handleDel"
          >
            删除({{ selCount }})
          </div>
        </div>
      </div>
    </div>
    <!-- ② 未登录用户 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>

  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: { CountBox },
  name: 'CartIndex',
  data () {
    return {
      // 编辑 定义是否在删除的状态
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    // 商品总数cartTotal selCount选中结算的商品总数 选中的商品总价selPrice
    ...mapGetters('cart', ['cartTotal', 'selCartList',
      'selCount', 'selPrice', 'isAllCheck'
    ]),
    isLogin () {
      return this.$store.getters.token
    }
  },
  // 监视isEdit的变化，删除全不选 结算全选中
  watch: {
    // 变化后的值value
    isEdit (value) {
      if (value) {
        // 变化后为true 切换为删除的状态
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        // 结算状态
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  },
  methods: {
    toggleCheck (goodsId) {
      // 告诉vueX 哪一条商品的复选框 被点击了
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllCheck)
    },
    changeCount (value, goodsId, skuId) {
      // 去Vuex的actions发请求 更新购物车商品数量 数字框修改数量
      this.$store.dispatch('cart/changeCountAction', {
        value,
        goodsId,
        skuId
      })
    },
    async handleDel () {
      // selCount选中结算的商品总数
      if (this.selCount === 0) return
      // 删除选中的商品
      // 此处调用了 异步的方法 需要时间 await等一等
      await this.$store.dispatch('cart/delSelect')
      // 重置为 结算的状态
      this.isEdit = false
    },
    goPay () {
      // selCount选中结算的商品总数   在Vuex cart购物车模块 管理
      // select选中的商品 结算跳转
      if (this.selCount > 0) {
        this.$router.push({
          path: '/pay',
          // 查询参数 传递
          query: {
            mode: 'cart',
            // 选中的商品项 保留 复选框选中项selCartList
            // [id,id,123,456]
            cartIds: this.selCartList.map(item => item.id).join(',')
          }
        })
      }
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}

.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
