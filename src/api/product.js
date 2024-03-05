// 与商品相关的
import request from '@/utils/request'

export const getProList = ({ categoryId, goodsName, page }) => {
  return request({
    url: '/goods/list',
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 商品详情页
export const getProDetail = (goodsId) => {
  return request({
    url: '/goods/detail',
    params: {
      goodsId
    }
  })
}

// 获取商品评论
export const getProComments = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    params: {
      goodsId,
      limit
    }
  })
}
