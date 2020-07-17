<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/paths' }">
        用户管理
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">
        用户列表
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-input placeholder="请输入内容" v-model="input3">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>
  </div>
</template>

<script>
  export default {
    // name: 'Users'
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 16px;
  }

  .el-card {
  }
</style>
