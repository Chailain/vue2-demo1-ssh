<template>
  <div>
    <h1>Search</h1>
    <van-button type="primary">主要按钮</van-button>
    <button @click="y">点击</button>
    <div>{{ arr }}</div>
    <div>{{ text }}</div>
    <div>{{ $store.state.user.textSearch }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  data () {
    return {
      arr: [1, 2, 3]
    }
  },
  computed: {
    ...mapState({
      text: (state) => {
        return state.user.textSearch
      }
    })
  },
  methods: {
    y () {
      this.$set(this.arr, 2, 4)
    }
  }
}
</script>

<style>

</style>
