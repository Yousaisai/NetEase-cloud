<!--
 * @Descripttion: 这里是搜索的界面
 * @Author: Mr.You
 * @Date: 2020-10-21 09:45:07
 * @LastEditTime: 2020-11-09 18:18:19
-->
<template>
  <div class="content">
    <div class="search">
      <div class="sousuo">音乐搜索</div>
      <div class="elsearch">
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
  flex-direction: column;
  .search {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .sousuo {
      font-size: 22rem;
      padding: 20rem;
    }
    .elsearch {
      padding: 20rem;
      transform: scale(1.2);
      width: 30%;
    }
  }

  .search_content {
    background-color: #ffffff;
    width: 100%;
  }
}
</style>