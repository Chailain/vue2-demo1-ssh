import request from '@/utils/request'

export const getHomeData = () => {
  return request({
    url: '/page/detail',
    params: {
      pageId: 0
    }
  })
}
