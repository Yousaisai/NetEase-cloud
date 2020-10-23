<!--
 * @Descripttion: 这里是搜索的界面
 * @Author: Mr.You
 * @Date: 2020-10-21 09:45:07
 * @LastEditTime: 2020-10-21 19:57:11
-->
<template>
  <div class="content">
    <div class="search">
      <div class="elsearch">
        <div style="padding: 10px">
          <span style="color: #666; font-size: 20px">音乐搜索</span>
        </div>
        <el-search :width="500" />
      </div>
    </div>
    <div class="search_content">
      <div class="nav">
        <el-menu
          :default-active="initMenu + '?' + 'keywords=' + keyword"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item :index="'/Search/SongsList?' + 'keywords=' + keyword"
            >单曲</el-menu-item
          >
          <el-menu-item :index="'/Search/Album?' + 'keywords=' + keyword"
            >专辑</el-menu-item
          >
          <el-menu-item :index="'/Search/Mv?' + 'keywords=' + keyword"
            >MV</el-menu-item
          >
          <el-menu-item :index="'/Search/PlayList?' + 'keywords=' + keyword"
            >歌单</el-menu-item
          >
          <el-menu-item :index="'/Search/Singers?' + 'keywords=' + keyword"
            >歌手</el-menu-item
          >
        </el-menu>
      </div>
      <div class="search_item">
        <keep-alive>
          <router-view :searchRe="searchRe"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>





<script>
import elSearch from "@/components/Search";
import { banner, Search } from "@/api/index";

export default {
  components: {
    elSearch,
  },
  data() {
    return {
      searchRe: "",
      payload: {
        keywords: "",
        type: 1,
      },
    };
  },
  computed: {
    initMenu() {
      return this.$route.path;
    },
    keyword() {
      return this.$route.query.keywords;
    },
  },
  watch: {
    $route(to, from) {
    //   var path = this.$route.path.slice(8);
    //   if (path == "SongsList") {
    //     this.payload.type = 1;
    //   } else if (path == "Album") {
    //     this.payload.type = 10;
    //   } else if (path == "Mv") {
    //     this.payload.type = 1004;
    //   } else if (path == "PlayList") {
    //     this.payload.type = 1000;
    //   } else {
    //     this.payload.type = 100;
    //   }
      this.getSearch();
    },
  },
  mounted() {
    this.getSearch();
  },
  methods: {
    async getSearch() {
      var path = this.$route.path.slice(8);
      if (path == "SongsList") {
        this.payload.type = 1;
      } else if (path == "Album") {
        this.payload.type = 10;
      } else if (path == "Mv") {
        this.payload.type = 1004;
      } else if (path == "PlayList") {
        this.payload.type = 1000;
      } else {
        this.payload.type = 100;
      }
      this.payload.keywords = this.keyword;

      if (this.keyword.trim() == "") {
        return;
      }
      var res = await Search(this.payload);
      this.searchRe = res.result;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  position: relative;
  flex-direction: column;
  .search {
    position: absolute;
    z-index: 10000000000;
    top: -61px;
    width: 100%;
    height: 200px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;

    .elsearch {
      transform: scale(1.2);
      margin: auto 0;
      width: 30%;
    }
  }

  .search_content {
    top: 140px;
    background-color: #ffffff;
    width: 100%;
    z-index: 10000000000;
    position: absolute;
    .nav {
    }

    .search_item {
    }
  }
}
</style>