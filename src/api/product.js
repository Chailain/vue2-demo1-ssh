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
