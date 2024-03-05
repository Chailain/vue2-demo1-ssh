<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      // 转数字处理 (1) 成功转为数字 (2) 转换失败返回NaN
      const num = +e.target.value

      // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }

      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    // 移除按钮的轮廓 无论何时按钮被点击或选中，都不会再显示轮廓
    outline: none;
    border: none;
    background-color: #efefef;
  }
  button:focus {
    outline: 2px solid olive; /* 这里的颜色可以根据需要进行调整 */
  }
  .inp {
    width: 40px;
    height: 30px;
    // Mozilla的私有属性-moz-focus-inner来进行处理
    // Firefox浏览器 按钮仍可能会显示虚线框
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
