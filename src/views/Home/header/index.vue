<!--
 * @Descripttion: 页面上面的部分
 * @Author: Mr.You
 * @Date: 2020-10-12 19:34:01
 * @LastEditTime: 2020-10-20 17:03:33
-->
<template>
  <div class="content">
    <el-row type="flex" align="center">
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <svg-icon
              icon-class="网易云"
              style="font-size: 3.5em; padding: 0px 0; line-height: 40px"
          /></el-col>
          <el-col :span="16">
            <div class="title">Mr.You</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="padding: 10px 0; line-height: 40px">
        <el-popover placement="bottom" width="250" height="100" trigger="focus">
          <div v-show="search.trim() == ''" class="defsearch">
            <span class="seatitle"> 大家都在搜</span>
            <ul>
              <li v-for="(item, index) in this.hotSearch" :key="index">
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
                    <span
                      v-html="item.name.replace(search.trim(), searchtext)"
                    ></span
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
            v-model="search"
            suffix-icon="el-icon-search"
            :placeholder="DefPlaceHoder"
            size="small"
            slot="reference"
            @input="querySearch"
          >
          </el-input>
        </el-popover>
      </el-col>
      <el-col :span="16">
        <div
          v-if="!auth"
          style="
            float: right;
            padding: 10px 0;
            line-height: 40px;
            color: #f3f3f3;
          "
        >
          <span>登录</span>
        </div>

        <div
          v-if="auth"
          style="float: right; padding: 10px 0; line-height: 40px"
        >
          <svg-icon
            icon-class="网易云"
            style="font-size: 3.5em; padding: 10px 0; line-height: 40px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>





<script>
import { SearchSug, DefSearch, HotSearch } from "@/api/index";
export default {
  data() {
    return {
      search: "",
      auth: false,
      DefPlaceHoder: "音乐/视频/电台/用户",
      hotSearch: [],
      allSearch: {},
    };
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
      res.map((val, index) => {
        val["value"] = val.first;
        val["index"] = index;
      });
      this.hotSearch = res;
    },
    async querySearch(val) {
      console.log(1);
      // 调用 callback 返回建议列表的数据

      if (val.trim() == "") {
        return;
      }
      var result = await this.getSearchSug(val);
      console.log(result);
      this.allSearch = result;
    },

    async getSearchSug(val) {
      var res = await SearchSug(val);
      return res.result;
    },

    handleSelect(val) {
      console.log(val);
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

    li { font-size: 12px;
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
    width: 180px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
      // border-top: 2px solid #f5f5f5;
      // border-bottom: 2px solid #f5f5f5;
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