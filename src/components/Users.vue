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
          <el-input placeholder="请输入内容" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
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
              inactive-color="#909399" @change="userStateChange(scope.row)">
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
    <!--    对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      @close="addDialogClosed('addForm')">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    // name: 'Users'
    data () {
      //自定义的邮箱规则
      let checkEmail = (rule, value, callback) => {
        const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (regEmail.test(value)) {
          return callback()
        }
        callback(new Error('请输入合法的邮箱'))
      }
      return {
        //获取用户列表对应的参数对象
        queryInfo: {
          // 查询条件
          query: '',
          // 第几页
          pagenum: 1,
          // 每页显示的条目数
          pagesize: 2
        },
        // 用户列表
        userList: [],
        // 查询总条数
        total: 0,
        // 对话框显示隐藏
        dialogVisible: false,
        // 添加用户表单
        addForm: {
          username: '',
          password: '',
          email: ''
        },
        // 添加用户表单规则
        addFormRules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
              mobile: ''
            },
            {
              min: 3,
              max: 12,
              message: '长度在 3 到 12 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入电子邮箱',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              trigger: 'blur'
            }
          ],
          mobile: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '目前只支持中国大陆的手机号码',
              trigger: 'blur'
            }
          ]
        },

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
      },
      /**
       * 修改用户状态
       * @param userInfo
       * @returns {Promise<ElMessageComponent>}
       */
      async userStateChange (userInfo) {
        const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
      },
      /**
       * 关闭添加用户模块
       * @param formName
       */
      addDialogClosed (formName) {
        this.$refs[formName].resetFields()
      },
      /**
       * 添加用户点击事件
       * @param formName
       */
      addUser (formName) {
        this.$refs[formName].validate(async valid => {
          // 判断验证是否通过
          if (!valid) return
          // 预校验通过发请求
          const { data: res } = await this.$http.post('users', this.addForm)
          // 201状态码一般为以创建
          if (res.meta.status !== 201) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          // 隐藏对话框
          this.dialogVisible = false
          // 更新用户列表
          this.getUsersList()
        })
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

  .el-pagination {
    margin-top: 16px;
  }
</style>
