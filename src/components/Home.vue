<template>
  <el-container class="home_box">
    <!--    侧边栏-->
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <h5>系统功能</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">
                  <i class="el-icon-location"></i>
                  分组一
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <!--    主题区-->
    <el-container>
      <!--      头部-->
      <el-header>
        <!--        Header-->
        <div>
          <img src="../assets/logo.png" alt="">
          <span>某某公司电商管理系统</span>
        </div>
        <el-row>
          <el-button type="danger" round @click="logout">退出登录</el-button>
        </el-row>
      </el-header>
      <!--      主题-->
      <el-main>Main</el-main>
      <!--      底部-->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>

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

<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #DCDFE6;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #F2F6FC;
    color: #333;
    h5{
      text-align: center;
    }
  }

  .el-main {
    background-color: #EBEEF5;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }

  .home_box {
    height: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
      margin-left: 30px;

      span {
        margin-left: 30px;
        font-weight: 700;
      }

      img {
        width: 60px;
      }
    }
  }

</style>
