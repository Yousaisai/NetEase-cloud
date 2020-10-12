<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
  >
    <el-menu-item index="/Recommend">
      <span slot="title">发现音乐</span>
    </el-menu-item>
    <el-submenu index="/MyCreateList">
      <template slot="title">
        <span>我的音乐</span>
      </template>

      <el-menu-item index="/MyCreateList">创建的歌单</el-menu-item>
      <el-menu-item index="/MyLoveList">收藏的歌单</el-menu-item>
    </el-submenu>
  </el-menu>
</template>





<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      return path;
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
  padding-left: 0 !important;
}
/deep/.el-submenu__title {
  padding-left: 0 !important;
}
/deep/.el-icon-arrow-down:before {
  content: none !important;
}
.el-submenu .el-menu-item {
  // height: 50px;
  // line-height: 50px;
  padding: 0;
  min-width: 0;
}
</style>