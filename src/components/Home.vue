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
            <el-submenu :index="item.id+''" :key="item.id" v-for="item in menuList">
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="subItem.id+''" :key="subItem.id" v-for="subItem in item.children">{{subItem.authName}}</el-menu-item>
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
  data () {
    return {
      // 侧边栏数据
      menuList: [],
      // 侧边栏图标
      iconObj: {
        125: 'el-icon-user',
        103: 'el-icon-coordinate',
        101: 'el-icon-shopping-cart-full',
        102: 'el-icon-document',
        145: 'el-icon-coin'
      }
    }
  },
  created () {
    this.getMenuList()
  },
  // name: 'Home'
  methods: {
    /**
     * 退出登录
     */
    logout () {
      // 销毁本地token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      // 返回错误信息
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
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
