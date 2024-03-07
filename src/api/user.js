import request from '@/utils/request'

// 我的-获取用户信息
// 拿昵称 头像
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
