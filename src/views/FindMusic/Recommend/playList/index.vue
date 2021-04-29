<!--
 * @Descripttion: 推荐详情
 * @Author: Mr.You
 * @Date: 2020-10-13 09:53:41
 * @LastEditTime: 2021-04-29 16:35:33
-->
<template>
  <div class="content">
    <!-- 热门推荐开始 -->
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20rem" icon-class="碟片" />
          <span style="font-size: 25rem; padding-right: 5rem"> 热门推荐</span>
          <span
            v-for="(item, index) in ['华语', '流行', '摇滚', '民谣', '电子']"
            :key="index"
          >
            <router-link
              style="text-decoration: none"
              :to="{ path: '/SongList', query: { cat: item } }"
            >
              <span
                class="more"
                style="
                  padding: 0 10rem 0 0;
                  color: #666;
                  border-right: 1.5px solid #666;
                  font-size: 13rem;
                "
                >{{ item }}
              </span>
            </router-link>
          </span>
          <router-link to="/SongList">
            <span class="more" style="float: right; font-size: 12rem"
              >更多
            </span></router-link
          >
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <div class="content_item">
      <div
        class="item_img"
        v-show="index < 10"
        v-for="(item, index) in playlists"
        :key="index"
      >
        <router-link :to="{ name: 'Playlist', query: { id: item.id } }">
          <div class="image">
            <img :src="item.picUrl" :alt="item.name" />
            <div class="imglove">
              <div class="playcount">
                <div class="shouting">
                  <svg-icon icon-class="收听量" style="padding-right: 5rem" />{{
                    item.playCount > 100000
                      ? parseInt(item.playCount / 10000) + "W"
                      : item.playCount
                  }}
                </div>
                <div class="bofang">
                  <svg-icon icon-class="播放" style="float: right" />
                </div>
              </div>
              <div class="player"></div>
            </div></div
        ></router-link>
        <div class="titledetail">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 热门推荐结束 -->

    <!-- 新碟上架开始 -->
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20rem" icon-class="碟片" />
          <span style="font-size: 25rem; padding-right: 5rem">新碟上架</span>
          <router-link to="/AddedNewAlbum">
            <span class="more" style="float: right; font-size: 12rem"
              >更多
            </span></router-link
          >
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="content_newitem" v-if="newAlbums.length != 0">
      <svg-icon class="icon" icon-class="左" @click="albums(0)" />
      <div
        class="newitem_img"
        v-for="(item, index) in newAlbums.filter((data, index) => {
          return index <= 5;
        })"
        :key="index"
      >
        <router-link :to="{ name: 'Newalbum', query: { id: item.id } }">
          <div class="image">
            <img :src="item.picUrl" :alt="item.name" />
            <div class="imglove">
              <svg-icon icon-class="播放" style="float: right" />
            </div>
          </div>
        </router-link>

        <div class="titledetail">
          <span>{{ item.name }}</span
          ><br />
          <span>{{ item.artist.name }}</span>
        </div>
      </div>
      <svg-icon class="icon" icon-class="右" @click="albums(1)" />
    </div>
    <!-- 新碟上架结束 -->

    <!-- 榜单开始 -->
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20rem" icon-class="碟片" />
          <span style="font-size: 25rem; padding-right: 5rem">榜单</span>
          <router-link to="/Leaderboard">
            <span class="more" style="float: right; font-size: 12rem"
              >更多
            </span></router-link
          >
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="toplist" v-if="topList.length != 0">
      <div class="topone" v-for="(item, TopItem) in 4" :key="TopItem">
        <div class="img">
          <router-link
            :to="{ path: '/Leaderboard', query: { id: topList[TopItem].id } }"
          >
            <el-image
              :src="topList[TopItem].coverImgUrl"
              style="width: 100rem; height: 100rem; float: left"
              fit="fill"
              :lazy="true"
            ></el-image>
          </router-link>
          <div class="imgtitle">
            <div class="span">
              <span>{{ topList[TopItem].name }}</span>
            </div>
            <div class="svg">
              <span>
                <svg-icon style="padding-right: 5rem" icon-class="收听量" />{{
                  topList[TopItem].playCount > 10000
                    ? parseInt(topList[TopItem].playCount / 10000) + "万"
                    : "topList[TopItem].playCount"
                }}</span
              >
            </div>
          </div>

          <br />
        </div>
        <div class="rank">
          <ul class="list">
            <li
              :key="index"
              v-for="(item, index) in topListDetail[TopItem]"
              v-show="index < 10"
              :class="index % 2 == 0 ? 'cor1' : 'cor2'"
            >
              <div class="spanhide">
                <span :class="index < 3 ? 'active' : null">{{
                  index + 1
                }}</span>
                <span>{{ item.name }}</span>
              </div>

              <div class="svghide">
                <svg-icon
                  @click="PlaySong(item, topListDetail[TopItem], index)"
                  style="padding: 0 5rem"
                  icon-class="播放 (6)"
                />
                <svg-icon
                  style="padding: 0 5rem"
                  @click="AddMusic(item)"
                  icon-class="加好 2-01"
                />
                <svg-icon style="padding: 0 5rem" icon-class="心 爱心 (2)" />
                <svg-icon style="padding: 0 5rem" icon-class="下载 (1)" />
              </div>
            </li>
            <router-link
              :to="{ path: '/Leaderboard', query: { id: topList[TopItem].id } }"
            >
              <span
                class="more"
                style="
                  font-size: 12rem;
                  padding: 10rem;
                  float: right;
                  color: #666;
                "
              >
                更多
              </span></router-link
            >
          </ul>
        </div>
      </div>
    </div>
    <!-- 榜单结束 -->
  </div>
</template>





<script>
import {
  Personal,
  playlist,
  resource,
  newAlbum,
  topList,
  playlistDetail,
} from "@/api/index.js";
export default {
  data() {
    return {
      //获取热门歌单
      playlists: [],
      //获取个性化推荐,需要登录
      individuation: [],
      //获取新碟上架
      newAlbums: [],
      //获取榜单摘要
      topList: [],
      //   榜单
      topListDetail: {},

      payloadNewAlbums: {
        limit: 5,
      },
      playlistPayload: {
        limit: 10,
      },
    };
  },

  mounted() {
    let data = this.$store.state.cacheData.AddedNewAlbum;
    let isFalse = data["isFalse"];
    if (!isFalse) {
      this.getPlayList();
      this.getAlbum();
      this.getPlayListDetail();
      this.getTopList();
    } else {
      this.topList = data.data["topList"];
      this.newAlbums = data.data["newAlbums"];
      this.individuation = data.data["individuation"];
      this.playlists = data.data["playlists"];
    }
  },
  methods: {
    albums(val) {
      //这个是为了左右切换使用截取再添加，上面使用了过滤器
      if (val == 0) {
        var alb = this.newAlbums.slice(-6);
        this.newAlbums.splice(-6);
        this.newAlbums.unshift(...alb);
      } else {
        var alb = this.newAlbums.slice(0, 6);
        this.newAlbums.splice(0, 6);
        this.newAlbums.push(...alb);
      }
    },
    async getPlayList() {
      var res = await Personal();
      this.playlists = res.result;
      this.$store.commit("ST_CacheData", {
        key: "Re",
        value: { key: "playlists", value: this.playlists },
      });
    },
    async getResource() {
      var res = await resource();
      this.individuation = res.recommend;
      this.$store.commit("ST_CacheData", {
        key: "Re",
        value: { key: "individuation", value: this.individuation },
      });
    },
    async getAlbum() {
      var res = await newAlbum();
      this.newAlbums = res.albums;
      this.$store.commit("ST_CacheData", {
        key: "Re",
        value: { key: "newAlbums", value: this.newAlbums },
      });
    },
    async getTopList() {
      var res = await topList();
      this.topList = res.list;
      this.$store.commit("ST_CacheData", {
        key: "Re",
        value: { key: "topList", value: this.topList },
      });
      this.getPlayListDetail();
    },
    async getPlayListDetail() {
      if (this.topList.length != 0) {
        for (let index = 0; index < 4; index++) {
          var res = await playlistDetail({ id: this.topList[index].id });
          this.$set(this.topListDetail, index, res.playlist.tracks);
        }
      }
    },
    AddMusic(song) {
      this.$store.dispatch("AddMusic", song);
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
    PlaySong(song, allsong, index) {
      this.$store.dispatch("PlaySongs", {
        oneSong: song,
        allSong: allsong,
        indexSong: index,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  .more:hover {
    font-weight: bold;
    cursor: pointer;
    color: #666;
  }
  .more {
    color: #666;
  }
  padding: 15rem;
  .content_sort {
    display: flex;
    justify-content: left;
    padding-bottom: 10rem;
    .el-row {
      width: 100%;
      .el-col {
        text-align: left;
      }
    }
    span {
      padding: 10rem;
    }
  }
  .el-divider {
    margin: 2rem;
  }
  .content_item {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .item_img {
      border-radius: 10rem;
      padding: 10rem;
      width: 18%;
      .image {
        position: relative;
        img {
          width: 100%;
          z-index: 1;
        }

        .imglove {
          height: 32rem;
          text-align: left;
          position: absolute;
          z-index: 10;
          width: 100%;
          top: 158rem;
          background-color: #3b4250;
          opacity: 0.5;
          color: #fff;
          backdrop-filter: 0.5;
          display: flex;
          font-size: 15rem;
          align-items: center;

          .playcount {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 10rem;
            .shouting {
              display: flex;
              align-items: center;
              flex: 6;
            }
            .bofang {
              display: flex;
              align-items: center;
              flex: 1;
            }
          }
        }
      }
      .image:hover {
        transform: scale(1.02);
      }

      .titledetail {
        text-align: left;
        font-size: 13rem;
      }
    }
  }
  .content_newitem {
    border: 1rem solid #f5f5f5;
    background-color: #f5f5f5;
    margin: 10rem 0;
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    justify-content: center;
    // overflow: scroll;
    .newitem_img {
      width: 160rem;
      height: 160rem;
      padding: 10rem 2rem;

      .image {
        position: relative;
        img {
          width: 8vw;
          height: 8vw;
        }
        .imglove {
          visibility: hidden;
          transform: translate(-4.5vw, -4.5vw);
          position: absolute;
          z-index: 10;
          width: 100%;
        }
      }
      .image:hover {
        transform: scale(1.02);
      }
      .titledetail {
        margin: 0 20rem;
        font-size: 6rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 7vw;
      }
    }
    .newitem_img :hover {
      .imglove {
        visibility: visible;
        transform: translate(-4.5vw, -4.5vw);
        position: absolute;
        z-index: 10;
        width: 100%;
      }
    }
  }
  .icon {
    margin: auto 5rem;
    padding: 5rem;

    cursor: pointer;
    display: hidder;
    visibility: hidden;
    background-color: #3b4250;
    opacity: 0.3;
    border-radius: 50%;
  }
  .content_newitem:hover {
    .icon {
      cursor: pointer;
      display: hidder;
      visibility: visible;
    }
  }
  .toplist {
    padding-top: 10rem;
    display: flex;
    .topone {
      background-color: #f4f4f4;
      flex: 1;
      border: 2rem solid #f5f5f5;
      .span {
        font-weight: bold;
      }
      .img {
        height: 100rem;
        padding: 10rem;

        .imgtitle {
          display: flex;
          font-size: 12rem;
          flex-direction: column;
          justify-content: space-between;
          align-items: start;
          padding: 0 10rem;
          height: 100%;
          .span {
          }
          .svg {
          }
        }
        // flex-direction: column;
      }
      .rank {
        padding: 0rem 0rem 0rem;

        .list {
          // margin: 25rem 0 0;
          padding: 0;
          list-style: none;
          text-align: left;
          li {
            padding: 5rem;
            width: 15vw;
            display: flex;
            .spanhide {
              // width: 15vw;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .svghide {
              display: none;
              cursor: pointer;
            }
            span {
              color: #666;
              font-size: 12rem;
              line-height: 22rem;

              &:first-child {
                background-color: #f5f5f5;
                border-radius: 20rem;
                display: inline-block;
                font-size: 12rem;
                font-weight: 600;
                margin-right: 24rem;
                height: 20rem;
                line-height: 20rem;
                width: 20rem;
                text-align: center;
              }
              &.active {
                background-color: #314659;
                color: #fff;
              }
            }
          }
        }
        .cor1 {
          background-color: #f4f4f4;
        }
        .cor2 {
          background-color: #e8e8e8;
        }
        li:hover {
          .svghide {
            display: flex;
          }
          .spanhide {
            width: 15vw;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          background-color: #fcfcfc;
          span {
            color: #666;
            font-size: 12rem;
            line-height: 22rem;
            &:first-child {
              background-color: #f5f5f5;
              // border-radius: 20rem;
              display: inline-block;
              font-size: 15rem;
              font-weight: 600;
              margin-right: 24rem;
              height: 20rem;
              line-height: 20rem;
              width: 20rem;
              text-align: center;
            }
            &.active {
              background-color: #314659;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>