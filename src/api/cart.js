import request from '@/utils/request'

// 添加商品到购物车
// 商品ID 10040 往购物车中加了哪一个商品
// 商品规格id（红色/粉色） 对当前商品的额外标识 库存  选择商品的规格
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}
