<template>
  <div v-if="product.goods_id" class="goods-item"
    @click="$router.push({
    name: 'prodetail',
    params: { id: product.goods_id }
  })">
    <div class="left">
      <img :src="product.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{ product.goods_name }}
      </p>
      <p class="count">已售{{ product.goods_sales }}件</p>
      <p class="price">
        <span class="new">¥{{ product.goods_price_min }}</span>
        <span class="old">¥{{ product.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['product']
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style style lang="less" scoped>
.goods-item {
  // 高度
  height: 148px;
  // 底部外边距
  margin-bottom: 6px;
  // 内边距
  padding: 10px;
  // 背景颜色
  background-color: #fff;
  // 设置flex布局
  display: flex;
  // 左边部分
  .left {
    // 宽度
    width: 127px;
    // 图片
    img {
      // 设置图片块级元素
      display: block;
      // 设置图片宽度
      width: 100%;
    }
  }
  // 右边部分
  .right {
    // 设置右边部分宽度
    flex: 1;
    // 字体大小
    font-size: 14px;
    // 行高
    line-height: 1.3;
    // 内边距
    padding: 10px;
    // 设置flex布局
    display: flex;
    // 设置flex布局方向
    flex-direction: column;
    // 设置垂直居中
    justify-content: space-evenly;

    // 数量
    .count {
      // 颜色
      color: #999;
      // 字体大小
      font-size: 12px;
    }
    // 价格
    .price {
      // 颜色
      color: #999;
      // 字体大小
      font-size: 16px;
      // 新价格
      .new {
        // 颜色
        color: #f03c3c;
        // 右边外边距
        margin-right: 10px;
        text-decoration-line: underline;
        // solid（实线）、wavy（波浪线）、dashed（虚线）
        text-decoration-style: wavy;
      }
      // 旧价格
      .old {
        // 文本装饰
        // underline（下划线）、overline（上划线）、line-through（删除线）
        text-decoration: line-through orange;
        // 字体大小
        font-size: 12px;
      }
    }
  }
}
</style>
