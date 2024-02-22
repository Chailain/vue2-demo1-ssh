// 所有与登录相关的接口请求
import request from '@/utils/request'

// 获取get图形Pic验证码Code
export const getPicCode = () => {
  // 在这里发请求 返回结果Promise对象 页面await去等 拿到结果
  return request.get('/captcha/image')
}

// 倒计时的时候，获取短信验证码
// 用户输入的图形验证码 图形验证码key 用户输入的-接收验证码手机
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    // 按照接口示例的格式传参 请求体
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 点击登录按钮
// 用户输入的-接收验证码手机 短信验证码246810
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      // 是否存在第三方用户信息 通用配置 取默认值 非三方登录
      isParty: false,
      // 三方登录信息?可选，默认为：{}
      // 配套isParty 无关的参数 给默认值
      partyData: {},
      mobile,
      smsCode
    }
  })
}
