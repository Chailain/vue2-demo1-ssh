<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <!-- <img src="@/assets/code.png" alt=""> -->
          <img v-if="picUrl" :src="picUrl" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second===totalSecond?'获取验证码':second+'秒后重新发送' }}
          </button>
        </div>
      </div>
      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      // 用户输入的图形验证码
      picCode: '',
      // 请求获取短信验证码时，必须要带的参数：图形验证码的唯一标识
      picKey: '',
      // 图形验证码URL图片地址 base64 str 单纯用来渲染 图形验证码图片
      picUrl: '',
      // 短信验证码60S倒计时 总秒数
      totalSecond: 60,
      // 短信验证码当前秒数 默认60 second--
      second: 60,
      timerId: null,
      // 手机号
      mobile: '',
      // 短信验证码
      msgCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      // 请求 获取 图形验证码 接口
      // await的结果 响应的数据结构 样子
      // {
      //   "status": 200,
      //   "message": "success",
      //   "data": {
      //     "base64": "data:image/png;base64,iVBQkSuQmCC",
      //     "key": "$2y$10$rf8kJyx.Xwn4ugE/3pZVtv2.1tpiH2",
      //     "md5": "f25ae60901ff709130b8fb50d1"
      //   }
      // }

      // 请求获取 要输入的 图形验证码的图片
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 获取短信验证码
    async getCode () {
      // 手机号与图形验证码校验都通过->请求获取短信验证码 倒计时前校验
      if (!this.validFn()) {
        // 校验输入框的内容 手机号与图形验证码
        return
      }
      // 如果 定时器没有运行过，并且 当前秒数=默认总秒数
      if (!this.timerId && this.second === this.totalSecond) {
        // 请求 获取 短信验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        // 启动一个新的定时器
        this.timerId = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timerId)
            // 0s 倒计时已结束 重置定时器
            this.timerId = null
            // 当前秒数 归位 60
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验 输入框 格式
    validFn () {
      // 校验输入的手机号
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      // 校验图形验证码的输入
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        // 246810
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      // 判断有无回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      // 正常粗细。与 400 等值。
      font-weight: normal;
    }
    p {
      // 行高
      line-height: 40px;
      // 字体大小
      font-size: 14px;
      // 字体颜色
      color: #b8b8b8;
    }
  }
  .form {
    .form-item {
      // 底部边框
      border-bottom: 1px solid #f3f1f2;
      // 内边距
      padding: 8px;
      // 底部外边距
      margin-bottom: 14px;
      // flex布局
      display: flex;
      // 垂直居中
      align-items: center;
      .inp {
        // 块级元素
        display: block;
        // 无边框
        border: none;
        // 无轮廓
        outline: none;
        // 高度
        height: 32px;
        // 字体大小
        font-size: 14px;
        // 占满剩余空间
        flex: 1;
      }
      img {
        // 宽度
        width: 94px;
        // 高度
        height: 31px;
      }
      button {
        // 设置高度
        height: 31px;
        // 设置边框为none
        border: none;
        // 设置字体大小
        font-size: 13px;
        // 设置字体颜色
        color: #cea26a;
        // 设置背景颜色为透明
        background-color: transparent;
        // 设置右边距
        padding-right: 9px;
      }
    }
  }
  .login-btn {
    // 设置宽度为100%
    width: 100%;
    // 设置高度为42px
    height: 42px;
    // 设置margin-top为39px
    margin-top: 39px;
    // 设置背景为线性渐变，从#ecb53c到#ff9211
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    // 设置颜色为白色
    color: #fff;
    // 设置圆角为39px
    border-radius: 39xp;
    // 设置阴影为 水平0 往下偏移10px 更模糊的阴影效果20px模糊程度
    // 无扩展0 阴影的颜色rgba(0, 0, 0, .1) 外阴影inset（内阴影）
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    // 设置字符间距为2px
    letter-spacing: 2px;
    // 设置flex布局
    display: flex;
    // 设置主轴对齐方式为居中
    justify-content: center;
    // 设置交叉轴对齐方式为居中
    align-items: center;
  }
}
</style>
