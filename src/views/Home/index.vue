<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2020-10-22 18:24:23
-->
<template>
  <div class="home">
    <el-container>
      <el-header style="height: 60px">
        <elheader />
      </el-header>
      <el-container>
        <el-aside width="130px"><elaside /></el-aside>
        <el-main
          ><div class="header">
            <elmain />
          </div>
          <div class="main">
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition></div
        ></el-main>
      </el-container>
      <el-footer style="height: 50px"><elfooter /></el-footer>
    </el-container>
  </div>
</template>

<script>
import elheader from "./header";
import elmain from "./main";
import elfooter from "./footer";
import elaside from "./aside";

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
    background-color: #2d2c2c;
    color: #333;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;

    height: calc(100vh - 110px);
  }

  .el-main {
    background-color: #f5f5f5;
    color: #333;
    padding: 0px;
    height: calc(100vh - 110px);
    display: flex;
    z-index: 2;
    flex-direction: column;
    .main {
      // width: 1080px;
      // margin: 0 auto;
    }
    .header {
      display: flex;
      background-color: #fff;
      justify-content: center;
      z-index: 100;
      position: sticky;
      top: 0;
    }
  }
}

</style>