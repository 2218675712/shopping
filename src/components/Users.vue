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
      <el-table :data="userList.users" stripe>
        <el-table-column type="index" width="120" label="编号" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="160" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180" align="center"></el-table-column>
        <el-table-column label="状态" width="140" align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#409EFF"
              inactive-color="#909399">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="操作" width="200" align="center">
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
      <!--      分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 4, 6, 40]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
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
          // 第几页
          pagenum: 1,
          // 每页显示的条目数
          pagesize: 2
        },
        userList: [],
        total: 0
      }
    },
    created () {
      this.getUsersList()
    },
    methods: {
      /**
       * 获取用户数据
       * @returns {Promise<ElMessageComponent>}
       */
      async getUsersList () {
        const { data: res } = await this.$http.get('users', {
          params: this.queryInfo
        })
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.userList = res.data
        this.total = res.data.total
      },
      /**
       * 前往??页
       * @param val
       */
      handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize
        this.getUsersList()
      },
      /**
       * 监听页码值
       * @param val
       */
      handleCurrentChange (newSize) {
        this.queryInfo.pagenum = newSize
        this.getUsersList()
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 16px;
    font-size: 14px;
  }

  .el-table {
    width: 100%;
    margin-top: 16px;
  }
  .el-pagination{
    margin-top: 16px;
  }
</style>
