<!--
 * @Descripttion: 我的音乐左侧导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 20:31:35
 * @LastEditTime: 2020-10-15 09:15:54
-->
<template>
  <div class="home">
    <el-container>
      <el-header style="height: 80px">
        <elheader />
      </el-header>
      <el-container>
        <el-aside width="130px"><elaside /></el-aside>
        <el-main
          ><div class="main">
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition></div
        ></el-main>
      </el-container>
      <el-footer style="height: 40px"><elfooter /></el-footer>
    </el-container>
  </div>
</template>

<script>
import elheader from "../Home/header";
import elmain from "../Home/main";
import elfooter from "../Home/footer";

import elaside from "../Home/aside";

export default {
  name: "Home",
  components: { elheader, elaside, elmain, elfooter },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .el-header {
    background-color: #9b0909;
    color: #333;
  }
  .el-footer {
    // background-color: #9B0909;
    color: #333;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;

    height: calc(100vh - 120px);
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    padding: 0px;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      background-color: #fff;
      justify-content: center;
    }
  }
}
</style>