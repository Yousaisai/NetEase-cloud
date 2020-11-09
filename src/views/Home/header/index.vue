<!--
 * @Descripttion: 页面上面的部分
 * @Author: Mr.You
 * @Date: 2020-10-12 19:34:01
 * @LastEditTime: 2020-11-09 18:18:48
-->
<template>
  <div class="content">
    <div class="nateasepic">
      <svg-icon
        icon-class="网易云"
        style="font-size: 40rem; line-height: 40rem"
      />
    </div>

    <div class="mr">Mr.You</div>

    <div class="search"><el-search :width="250" /></div>
    <div class="none"></div>
    <div v-if="!auth" class="register">
      <div><span @click="dialogVisible = !dialogVisible">登 录</span></div>
      <div style="margin:auto 10rem;transform: rotate(10deg);width:1px;height:12rem;background-color:#fff;"></div>
      <div><span @click="dialogVisible = !dialogVisible">注 册</span></div>
    </div>
    <div v-if="auth" class="avt">
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <span class="el-dropdown-link" v-if="avt">
          <el-image
            style="height: 30rem; width: 30rem; border-radius: 50%"
            :src="avt.avatarUrl"
            :lazy="true"
          ></el-image>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">我的主页</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      title="登录网易云音乐"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <login @logout="dialogVisible = !dialogVisible"></login>
    </el-dialog>
  </div>
</template>





<script>
import { getToken, removeCookie } from "@/utils/cookie";
import login from "./login/index";
import elSearch from "@/components/Search";
export default {
  components: {
    elSearch,
    login,
  },
  data() {
    return { dialogVisible: false };
  },
  computed: {
    avt() {
      return JSON.parse(getToken("profile"));
    },
    auth() {
      var isLogin = this.$store.state.isLogin;
      if (isLogin) {
        return isLogin;
      } else if (getToken("auth")) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},
  methods: {
    handleClose(done) {
      done();
    },
    handleCommand(command) {
      if (command == "logout") {
        //下面赋值为true是因为如果刷新了页面就会把vuex的isLogin设置为false如果下面直接赋值法拉瑟就不会检测到改变，
        this.$store.state.isLogin = true;
        removeCookie("token"), removeCookie("auth");
        this.$store.state.isLogin = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
span:hover {
  color: #dac5c5;
}
li:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
.content {
  display: flex;
  align-items: center;
  align-content: center;
  height: 100%;
  // span {
  //   font-size: 12px;
  //   cursor: pointer;
  // }
  .nateasepic {
    flex: 1;
  }
  .mr {
    flex: 2;
    color: #fff;
    font-size: 25rem;
  }
  .search {
    padding-left: 10rem;
    flex: 3;
  }
  .none {
    flex: 12;
  }
  .register {
    display: flex;
    font-size: 12rem;
    cursor: pointer;
    flex: 1.2;
    color: #fff;
  }
  .avt {
    flex: 1;
  }
}
</style>