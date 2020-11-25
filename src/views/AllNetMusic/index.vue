<!--
 * @Descripttion:全网音乐下载
 * @Author: Mr.You
 * @Date: 2020-11-25 09:40:58
 * @LastEditTime: 2020-11-25 11:43:09
-->
<template>
  <div class="content">
    <div class="search">
      <div class="sousuo">全网音乐搜索</div>
      <div class="elsearch">
        <el-input
          clearable
          @change="getSearch"
          v-model="payload.input"
          :placeholder="DefPlaceHoder"
        >
          <el-select
            v-model="payload.filter"
            slot="prepend"
            style="width: 100px; font-size: 13rem"
            placeholder="请选择"
          >
            <el-option label="音乐名称" value="name"></el-option>
            <el-option label="音乐 ID" value="id"></el-option>
          </el-select>
          <el-button
            @click="getSearch"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <div class="radio">
        <el-radio-group v-model="payload.type">
          <el-radio label="netease">网易</el-radio>
          <el-radio label="qq">QQ</el-radio>
          <el-radio label="kugou">酷狗</el-radio>
          <el-radio label="kuwo">酷我</el-radio>
          <el-radio label="xiami">虾米</el-radio>
          <el-radio label="baidu">百度</el-radio>
          <el-radio label="migu">咪咕</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="search_item" v-show="MusicData.length > 0">
      <el-table :data="MusicData" style="width: 100%">
        <el-table-column type="index">
          <template slot="header">
            <span>#</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="歌名"> </el-table-column>
        <el-table-column prop="author" label="歌手"> </el-table-column>
        <el-table-column label="下载" width="80" align="center">
          <template slot-scope="scope">
            <svg-icon
              @click="download(scope.row)"
              style="font-size: 16px; cursor: pointer"
              icon-class="下载 (1)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>





<script>
import { AllNetMusic, DefSearch } from "@/api/index";
export default {
  data() {
    return {
      MusicData: [],
      DefPlaceHoder: "请输入关键词",
      payload: {
        input: "",
        filter: "name",
        type: "netease",
        page: "1",
      },
    };
  },
  computed: {},
  watch: {
    payload: {
      handler() {
        this.getSearch();
      },
      deep: true,
    },
  },
  mounted() {
    this.getDefSearch();
  },
  methods: {
    //默认搜索词
    async getDefSearch() {
      var res = await DefSearch();
      this.DefPlaceHoder = "例如：" + res.data.realkeyword;
      var res1 = await AllNetMusic({
        input: res.data.realkeyword,
        filter: "name",
        type: "netease",
        page: "2",
      });
      this.MusicData = res1.data;
    },
    async getSearch() {
      var res = await AllNetMusic(this.payload);
      if (res.code != 200) {
        this.$message({
          message: res.error,
          type: "warning",
        });
        return;
      }
      this.MusicData = res.data;
    },
    download(song) {
      this.$store.dispatch("DownLoadAllMusic", song);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  min-height: calc(100vh - 110px);
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
      padding: 10rem;
      transform: scale(1.2);
      width: 45%;
    }
    .radio {
      padding: 20rem;
    }
  }

  .search_content {
    background-color: #ffffff;
    width: 100%;
  }
  .search_item {
    padding: 10rem;
  }
}
</style>