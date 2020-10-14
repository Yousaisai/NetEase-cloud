<template>
  <el-menu
    :default-active="initMenu"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/Recommend">推荐</el-menu-item>
    <el-menu-item index="/Leaderboard">排行榜</el-menu-item>
    <el-menu-item index="/SongList">歌单</el-menu-item>
    <el-menu-item index="/RadioAnchor">主播电台</el-menu-item>
    <el-menu-item index="/Singer">歌手</el-menu-item>
    <el-menu-item index="/AddedNewAlbum">新碟上架</el-menu-item>
  </el-menu>
</template>





<script>
export default {
  data() {
    return {};
  },
  computed: {
    initMenu() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>
