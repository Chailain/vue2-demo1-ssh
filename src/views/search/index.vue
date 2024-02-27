<template>
  <div class="search">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 搜索场景的输入框组件-自定义按钮 -->
    <van-search
      v-model.trim="search"
      show-action
      placeholder="请输入搜索关键词"
      clearable
    >
    <!-- 使用 action 插槽可以自定义右侧按钮的内容。 -->
    <!-- 使用插槽后，cancel 事件将不再触发。 -->
      <template #action>
        <div @click="onSearch(search)">搜索</div>
      </template>
    </van-search>

    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item"
          @click="onSearch(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      // 控制当前搜索框中的文字 输入框里面输东西
      search: '',
      // 在用户再次搜索时从本地加载历史记录
      history: getHistoryList()
    }
  },
  methods: {
    onSearch (key) {
      if (key) {
        // 存在历史 删了一个历史
        if (this.history.includes(key)) {
          const i = this.history.indexOf(key)
          this.history.splice(i, 1)
        }
        this.history.unshift(key)
      }
      // 在用户搜索时将搜索关键字保存到本地
      setHistoryList(this.history)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history.splice(0)
      // 清空历史记录
      setHistoryList([])
      this.$toast.success('清空历史成功')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  // 顶部导航栏的"<"
  /deep/ .van-nav-bar__left i {
    color: orange;
  }
  // "搜索"按钮 左边的部分
  ::v-deep .van-search__content{
    background:  #f7f8fa;
    color: green;
    .van-field__control{
      color: red;
    }
  }
  // 自定义右侧"搜索"按钮
  .van-search__action{
    border-radius: 0 5px 5px 0;
    background-color: red;
    padding: 0 20px;
    margin-right: 10px;
    color: #fff;
  }
  .search-history {
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
    }
    .list {
      // 子元素（按钮）在水平方向上排列
      display: flex;
      // 在必要时换行到下一行
      flex-wrap: wrap;
      // 确保按钮之间有等量的间隔
      justify-content: flex-start;
      padding: 0 10px;
      gap: 5%;
      .list-item {
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // 单个按钮设置了宽度以确保每行只有三个按钮
        // 并且按钮之间以及按钮与容器边缘之间有适当的间距
        width: calc(33.333% - 20px); /* 减去间距 */
        margin-bottom: 10px;
        background-color: white;
        // 按钮内的文字居中对齐
        text-align: center;
        // 为按钮顶部和底部添加了一些内边距
        padding: 10px 0;
        border: 1px solid #ccc;
        border-radius: 30px;
        // 确保按钮的总宽度包括了边框和内边距
        box-sizing: border-box;
      }
    }
  }
}
</style>
