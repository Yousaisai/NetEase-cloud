<!--
 * @Descripttion: 左侧导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 19:38:36
 * @LastEditTime: 2021-05-05 19:28:18
-->

<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
  >
    <el-menu-item index="/Recommend"> 发现音乐 </el-menu-item>
    <el-menu-item v-show="!auth" index="/MyMuisc">我的音乐</el-menu-item>
    <el-menu-item v-show="auth" index="/MyCreateList">我的歌单</el-menu-item>
    <el-menu-item v-show="auth" index="/MyLoveList">收藏歌单</el-menu-item>
     <el-menu-item index="/AllNetMusic"> 全网音乐 </el-menu-item>
  </el-menu>
</template>





<script>
import { getToken, removeCookie } from "@/utils/cookie";

export default {
  data() {
    return {
      initMenu: ["/Recommend", "/MyMuisc", "/MyCreateList", "/MyLoveList",'/AllNetMusic'],
    };
  },
  computed: {
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
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (this.initMenu.includes(path)) {
        return path;
      }
      return "/Recommend";
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-submenu {
  padding: 0 !important;
}
.el-menu-item {
  font-size: 14rem !important;
  padding-left: 0 !important;
}
/deep/.el-submenu__title {
  padding-left: 0 !important;
}
/deep/.el-icon-arrow-down:before {
  content: none !important;
}
</style>