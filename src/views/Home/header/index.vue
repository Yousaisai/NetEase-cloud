<!--
 * @Descripttion: 页面上面的部分
 * @Author: Mr.You
 * @Date: 2020-10-12 19:34:01
 * @LastEditTime: 2020-10-23 19:54:20
-->
<template>
  <div class="content">
    <el-row type="flex" align="center">
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <svg-icon
              icon-class="网易云"
              style="font-size: 3.5em; padding: 0px 0; line-height: 40px"
          /></el-col>
          <el-col :span="16">
            <div class="title">Mr.You</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="padding: 10px 0; line-height: 40px">
        <el-search :width="250" />
      </el-col>
      <el-col :span="16">
        <div
          v-if="!auth"
          style="
            float: right;
            padding: 10px 0;
            line-height: 40px;
            color: #f3f3f3;
          "
        >
          <span
            @click="dialogVisible = !dialogVisible"
            style="font-size: 12px; cursor: pointer"
            >登 录</span
          >
          /
          <span
            @click="dialogVisible = !dialogVisible"
            style="font-size: 12px; cursor: pointer"
            >注 册</span
          >
        </div>
        <div v-if="auth" class="avt">
          <el-dropdown placement="bottom-start" @command="handleCommand">
            <span class="el-dropdown-link" v-if="avt">
              <el-image
                style="height: 30px; width: 30px; border-radius: 50%"
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
      </el-col>
    </el-row>
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

.title {
  display: flex;
  margin: auto 0;
  height: 60px;
  font-size: 25px;
  color: #fff;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.avt {
  float: right;
  padding: 10px 0;
  margin-right: 30px;
  line-height: 40px;
  color: #f3f3f3;
  cursor: pointer;
}
</style>