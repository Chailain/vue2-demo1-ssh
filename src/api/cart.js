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

// 购物车商品更新  数字框修改数量  更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    // 正在操作的是哪一个商品
    goodsId,
    // 当前的商品的数量是多少
    goodsNum,
    // 商品的规格是哪一个（默认，单规格的Sku）
    goodsSkuId
  })
}

// 删除购物车商品   cartIds - array[string]
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    // 购物车数据的id
    cartIds
  })
}
