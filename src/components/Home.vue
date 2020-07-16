<template>
  <div>
    <el-row>
      <el-button type="danger" round @click="logout">退出登录</el-button>
    </el-row>
    我是home
  </div>

</template>

<script>
export default {
  // name: 'Home'
  methods: {
    logout () {
      // 销毁本地token
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
