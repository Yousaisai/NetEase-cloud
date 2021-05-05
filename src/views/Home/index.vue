<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2021-05-05 19:23:46
-->
<template>
  <div class="home">
    <el-container>
      <el-header style="height: 60px">
        <elheader />
      </el-header>
      <el-container>
        <el-aside><elaside /></el-aside>
        <el-main
          ><div class="header" v-if="isShow">
            <elmain />
          </div>
          <div class="main">
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition></div
        ></el-main>
      </el-container>
      <el-footer style="height: 50px"><elfooter></elfooter>" /></el-footer>
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
  data() {
    return {
      isShowFooter: false,
      path: [
        "/Recommend",
        "/Leaderboard",
        "/SongList",
        "/Singer",
        "/AddedNewAlbum",
      ],
    };
  },
  computed: {
    isShow() {
      var path = this.$route.path;
      return this.path.includes(path);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
   
  overflow: hidden;
  .el-header {
    // background-color: #9b0909;
   background-color: #2d2c2c;
    color: #333;
  }
  .el-footer {
    background-color: #2d2c2c;
    color: #333;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;
    height: calc(100vh - 150px);
    width: 130rem  !important;
    
  }
  .el-main {
    overflow: auto;
    background-color: #f5f5f5;
    color: #333;
    padding: 0rem;
    height: calc(100vh - 110px);
    display: flex;
    z-index: 2;
    flex-direction: column;
    .header {
      display: flex;
      background-color: #fff;
      justify-content: center;
      z-index: 100;
      position: sticky;
      top: 0;
    }
  }
  .el-main::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 2rem;
    background-color: #f5f5f5;
  }

  .el-main::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  .el-main::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e8e8e8;
  }
}
</style>