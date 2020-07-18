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
      <!--      搜索和添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--      用户列表区域-->
      <el-table :data="userList.users" stripe style="width: 100%">
        <el-table-column type="index" width="140" label="编号"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column label="状态" width="140">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#409EFF"
              inactive-color="#909399">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="操作" width="180">
          <template v-slot="scope">
            <el-tooltip content="修改" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip content="设置" :enterable="false">
              <el-button type="info" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    // name: 'Users'
    data () {
      return {
        //获取用户列表对应的参数对象
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        userList: [],
        total: 0
      }
    },
    created () {
      this.getUsersList()
    },
    methods: {
      async getUsersList () {
        const { data: res } = await this.$http.get('users', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.userList = res.data
        this.total = res.data.total
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 16px;
  }
</style>
