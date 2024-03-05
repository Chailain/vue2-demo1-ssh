import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const baseURL = 'http://cba.itlike.com/public/index.php?s=/api/'
const request = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间5s
  headers: { platform: 'h5' }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    // 加载图标类型：string, 可选值为 spinner 默认circular
    loadingType: 'spinner',
    // 展示时长(ms)：number，值为 0 时，toast 不会消失 默认2000 2s自动消失
    duration: 0
  })

  // 统一添加 请求头->token，平台
  const token = store.getters.token
  if (token) {
    // 'Access-Token'作为属性名 与接口文档要求保持一致
    config.headers['Access-Token'] = token
    // 运行的平台
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 后台返回的响应的数据 和接口给的响应示例 结构相同
  // {
  //   "status": 200,
  //   "message": "success",
  //   "data":{...}
  // }
  const res = response.data
  if (res.status !== 200) {
    // 给用户提示错误信息
    Toast(res.message)
    // 控制台报错 阻止await后的代码执行
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
