// 用户信息 本地持久化 key名 字符串格式的 'obj_user_info'
const INFO_KEY = 'obj_user_info'
const HISTORY_KEY = 'hm_history_list'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = {
    token: '',
    // 用户的唯一标识
    userId: ''
  }
  // Uncaught ReferenceError: INFO_KEY is not defined
  // localStorage.getItem读不出来不存在的key对应的值
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (info) => {
  // info = {
  //   userId: 10003,
  //   token: "1741f74aed758a688515f72572dc8e37"
  // }
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
// export const removeInfo = () => {
//   localStorage.removeItem(INFO_KEY)
// }

// 获取搜索历史记录
export const getHistoryList = () => {
  // 获取localStorage中HISTORY_KEY的值-->如果转换失败，则返回空数组
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史记录
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
