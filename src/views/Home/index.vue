<template>
  <div class="home">
    <el-container>
      <el-header style="height: 80px"></el-header>
      <el-container>
        <el-aside width="100px"></el-aside>
        <el-main
          ><div class="header">
            <el-menu
              default-active="Recommend"
              class="el-menu-demo"
              mode="horizontal"
              :router="true"
            >
              <el-menu-item index="Recommend">推荐</el-menu-item>
              <el-menu-item index="Leaderboard">排行榜</el-menu-item>
              <el-menu-item index="SongList">歌单</el-menu-item>
              <el-menu-item index="RadioAnchor">主播电台</el-menu-item>
              <el-menu-item index="singer">歌手</el-menu-item>
              <el-menu-item index="AddedNewAlbum">新碟上架</el-menu-item>
            </el-menu>
          </div>
          <div class="main"><router-view></router-view></div
        ></el-main>
      </el-container>
      <el-footer style="height: 40px"></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
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
    background-color: #d3dce6;
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