<!--
 * @Descripttion: 页面上面的部分
 * @Author: Mr.You
 * @Date: 2020-10-12 19:34:01
 * @LastEditTime: 2020-10-21 19:39:26
-->
<template>
  <el-popover
    placement="bottom"
    v-model="isShow"
    :width="width"
    height="100"
    trigger="focus"
  >
    <div v-show="search.trim() == ''" class="defsearch">
      <span class="seatitle"> 大家都在搜</span>
      <ul>
        <li
          v-for="(item, index) in this.hotSearch"
          @click="handselect(item)"
          :key="index"
        >
          <div class="li">
            <span :class="index > 2 ? 'index1' : 'index2'">{{
              index + 1
            }}</span>
            <span>{{ item.first }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="searchall" v-show="search.trim() != ''">
      <div class="singer" v-if="allSearch.artists">
        <div class="seatitle">
          <svg-icon style="font-size: 1.2em" icon-class="歌手" /> 歌手
        </div>
        <div class="item">
          <router-link
            v-for="item in allSearch.artists"
            :key="item.id"
            style="text-decoration: none; color: #666"
            :to="{
              path: '/SingerDetail/Music',
              query: { id: item.id },
            }"
          >
            <li>
              <span
                v-html="item.name.replace(search.trim(), searchtext)"
              ></span>
            </li>
          </router-link>
        </div>
      </div>
      <div class="album" v-if="allSearch.albums">
        <div class="seatitle"><svg-icon icon-class="专辑" /> 专辑</div>
        <div class="item">
          <router-link
            v-for="item in allSearch.albums"
            :key="item.id"
            style="text-decoration: none; color: #666"
            :to="{ path: '/NewAlbum', query: { id: item.id } }"
          >
            <li>
              <span
                v-html="item.name.replace(search.trim(), searchtext)"
              ></span>
              - {{ item.artist.name }}
            </li></router-link
          >
        </div>
      </div>
      <div class="songs" v-if="allSearch.songs">
        <div class="seatitle"><svg-icon icon-class="音乐" /> 单曲</div>
        <div class="item">
          <router-link
            v-for="item in allSearch.songs"
            :key="item.id"
            style="text-decoration: none; color: #666"
            :to="{ path: '/PlayDetail', query: { id: item.id } }"
          >
            <li>
              <span v-html="item.name.replace(search.trim(), searchtext)"></span
              >-
              {{ item.artists[0].name }}
            </li>
          </router-link>
        </div>
      </div>
      <div class="songs" v-if="allSearch.playlists">
        <div class="seatitle"><svg-icon icon-class="歌单" /> 歌单</div>
        <div class="item">
          <router-link
            v-for="item in allSearch.playlists"
            :key="item.id"
            style="text-decoration: none; color: #666"
            :to="{
              path: '/PlayList',
              query: { id: item.id },
            }"
          >
            <li>
              <span
                v-html="item.name.replace(search.trim(), searchtext)"
              ></span>
            </li>
          </router-link>
        </div>
      </div>
    </div>

    <el-input
    v-on:keyup.enter="emitSearch"
      @change="emitSearch"
      v-model="search"
      suffix-icon="el-icon-search"
      :placeholder="DefPlaceHoder"
      size="small"
      slot="reference"
      @input="querySearch"
      
    >
    </el-input>
  </el-popover>
</template>





<script>
import { SearchSug, DefSearch, HotSearch } from "@/api/index";
export default {
  props: {
    width: {
      type: Number,
      default: 250,
    },
    heigth: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      isShow: false,
      search: "",
      auth: false,
      DefPlaceHoder: "音乐/视频/电台/用户",
      hotSearch: [],
      allSearch: {},
    };
  },
  watch: {
    $route(to, from) {
      this.isShow = false;
    },
  },
  computed: {
    searchtext() {
      return `<span style='color:#3E8CD7'>${this.search}</span>`;
    },
  },
  mounted() {
    this.getDefSearch();
    this.getHotSearch();
  },
  methods: {
    //默认搜索词
    async getDefSearch() {
      var res = await DefSearch();
      this.DefPlaceHoder = res.data.realkeyword;
    },

    async getHotSearch() {
      var res = await HotSearch();
      res = res.result.hots;

      this.hotSearch = res;
    },
    async querySearch(val) {
      // 调用 callback 返回建议列表的数据

      if (val.trim() == "") {
        return;
      }
      var result = await this.getSearchSug(val);
      var obj = Object.keys(result);
      console.log(obj);
      var obj1 = ["albums", "artists", "songs", "playlists"];
      var objTrue = obj.some((val) => {
        return obj1.includes(val) == true;
      });
      if (objTrue) {
        this.isShow = true;
        this.allSearch = result;
        return;
      }
      this.isShow = false;
    },

    async getSearchSug(val) {
      var res = await SearchSug(val);
      return res.result;
    },
    handselect(val) {
      this.isShow = false;
      this.search = val.first;
      this.emitSearch(val.first);
    },
    emitSearch(val) {
      if (this.$route.path == "/Search/SongsList") {
        this.$router.push({
          query: { keywords: val },
        });
        return;
      }
      this.$router.push({
        path: "/Search/SongsList",
        query: { keywords: val },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
li:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
.defsearch {
  // background-color: #f5f5f5;
  // display: flex;
  // flex-wrap: wrap;

  .seatitle {
    font-size: 18px;
    color: black;
    padding-bottom: 120px;
  }
  ul {
    padding: 10px 10px 0 10px;
    margin: 0;

    li {
      font-size: 12px;
      list-style: none;

      .li {
        padding: 10px 0;
        .index1 {
          background-color: #f5f5f5;
          border-radius: 20px;
          display: inline-block;

          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
        .index2 {
          background-color: #314659;
          border-radius: 20px;
          display: inline-block;

          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}

.title {
  display: flex;
  margin: auto 0;
  height: 60px;
  font-size: 25px;
  color: #fff;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.spanhot {
   
  background-color: #666;
  color: #fff;
  padding: 2px 5px;
  border-radius: 50%;
  font-size: 10px;
}
.span {
  padding: 2px 5px;
  border-radius: 50%;
  font-size: 10px;
}

.searchall {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  li {
    overflow: hidden;
    list-style: none;
    // width:180px;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // overflow: hidden;
    padding: 10px 0;
  }

  .singer {
    display: flex;
    flex-direction: row;
    align-items: center;

    .seatitle {
      color: #666;
      flex: 1;
      // border-top: 2px solid #f5f5f5;

      padding: 15px 0px;
    }
    .item {
      border-left: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
  .album {
    display: flex;
    flex-direction: row;
    align-items: center;
    .seatitle {
      color: #666;
      flex: 1;
    }
    .item {
      border-left: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
  .songs {
    display: flex;
    flex-direction: row;
    align-items: center;
    .seatitle {
      color: #666;
      flex: 1;
    }
    .item {
      border-left: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
      padding: 2px 5px;
      flex: 3;
    }
  }
}
</style>