import request from '@/utils/request'

// 这里的订单结算，有两种情况：mode模式
// 购物车下单，需要两个参数 （购物车->去结算->订单）
// ① mode="cart" ② cartIds="string"
// 立即购买结算，需要三个参数 （商品详情页->立即购买->立即购买->订单）
// ① mode="buyNow" ② goodsId="商品id" ③ goodsSkuId="商品skuId" 商品数量
// 都需要跳转时将参数传递过来

// {
//   "mode": "buyNow", //结算模式
//   "delivery": 10, //配送方式（10快递配送 20上门自提）
//   "payType": 10, // 支付类型 余额支付
//   "couponId": 0, //优惠券ID
//   "isUsePoints": 0, //是否使用积分抵扣（1使用 0不使用）
//   "remark": "", // 用户留言
//   "goodsId": "10038", // 商品id
//   "goodsNum": "1", // 商品数量
//   "goodsSkuId": "0" // 商品规格
//   cartIds:"" //购物车ID集
// }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// export const checkOrder = (mode, obj) => {
//   return request.post('/checkout/order', {
//     mode,
//     // 配送方式（10快递配送 20上门自提）
//     delivery: 20,
//     // 不使用优惠券
//     couponId: 0,
//     // 不使用积分
//     isUsePoints: 0,
//     ...obj
//   })
// }

// 提交订单
// 模式mode   额外的参数params
// mode="cart" obj {cartIds 【remark】}
// mode="buyNow" obj{goodsId goodsSkuId goodsNum 【remark】}
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 20, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}

// 我的-订单
// 订单类型dataType，all-全部，payment-待支付，
// delivery-待发货，received-待收货，comment-待评价
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
