<template>
  <div class="login_box">
    <div class="login-form">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--      登录表单-->
      <el-form ref="loginForm" :model="loginForm" label-width="0px" :rules="loginRules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" clearable v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" show-password clearable v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button type="info" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'Login'
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 4,
          max: 12,
          message: '长度在 4 到 12 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 12,
          message: '长度在 6 到 12 个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    /**
       * 登录功能
       * @param formName  参数
       */
    login (formName) {
      this.$refs[formName].validate(async (valid) => {
        // 如果为空不提交
        if (!valid) return false
        // 获取请求数据
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 弹出提示信息
        if (res.meta.status !== 200) {
          return this.$message({
            message: res.meta.msg,
            type: 'error'
          })
        }
        this.$message.success(res.meta.msg)
        // 保存session
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到主页
        this.$router.push('/home')
      })
    },
    /**
       * 重置表单功能
       * @param formName  参数
       */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login_box {
    height: 100%;
    background-color: #F5F7FA;

    .login-form {
      width: 450px;
      height: 300px;
      background-color: #FFFFFF;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
  }

  .login-form .logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    background-color: #FFFFFF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .login-form .el-form {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
