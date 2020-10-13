<template>
  <div class="content">
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20px" icon-class="碟片" />
          <span style="font-size: 25px; padding-right: 5px"> 热门推荐</span>
          <span>华语</span>| <span>流行</span>| <span>摇滚</span>|
          <span>民谣</span>| <span>电子</span>
          <span style="float: right; font-size: 12px"
            >更多 <svg-icon icon-class="前进" /></span
        ></el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <div class="content_item">
      <div class="item_img" v-for="(item, index) in playlists" :key="index">
        <div class="image">
          <img :src="item.coverImgUrl" :alt="item.name" />
          <div class="imglove">
            <div class="playcount">
              <svg-icon icon-class="收听量" style="padding-right: 5px" />{{
                item.playCount > 100000
                  ? parseInt(item.playCount / 10000) + "W"
                  : item.playCount
              }}<svg-icon icon-class="播放" style="float: right" />
            </div>
            <div class="player"></div>
          </div>
        </div>
        <div class="titledetail">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20px" icon-class="碟片" />
          <span style="font-size: 25px; padding-right: 5px">新碟上架</span>
          <span style="float: right; font-size: 12px"
            >更多 <svg-icon icon-class="前进"
          /></span>
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
        <div class="image">
          <img :src="item.picUrl" :alt="item.name" />
          <div class="imglove">
            <svg-icon icon-class="播放" style="float: right" />
          </div>
        </div>
        <div class="titledetail">
          <span>{{ item.name }}</span
          ><br />
          <span>{{ item.artist.name }}</span>
        </div>
      </div>
      <svg-icon class="icon" icon-class="右" @click="albums(1)" />
    </div>
    <div class="content_sort">
      <el-row type="flex">
        <el-col :span="24"
          ><svg-icon style="font-size: 20px" icon-class="碟片" />
          <span style="font-size: 25px; padding-right: 5px">榜单</span>
          <span style="float: right; font-size: 12px"
            >更多 <svg-icon icon-class="前进"
          /></span>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="toplist" v-if="topList.length != 0">
      <div class="topone">
        <div class="img">
          <el-image
            :src="topList[0].coverImgUrl"
            style="width: 100px; height: 100px; float: left"
            fit="fill"
            :lazy="true"
          ></el-image>
          <br />
          <span class="span">{{ topList[0].name }}</span>
        </div>
        <div class="rank">
          <ul class="list">
            <li
              :key="index"
              v-for="(item, index) in topListDetail[0]"
              v-show="index < 10"
              :class="index % 2 == 0 ? 'cor1' : 'cor2'"
            >
              <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="topone">
        <div class="img">
          <el-image
            :src="topList[1].coverImgUrl"
            style="width: 100px; height: 100px; float: left"
            fit="fill"
            :lazy="true"
          ></el-image>
          <br />
          <span class="span">{{ topList[1].name }}</span>
        </div>
        <div class="rank">
          <ul class="list">
            <li
              :key="index"
              v-for="(item, index) in topListDetail[1]"
              v-show="index < 10"
              :class="index % 2 == 0 ? 'cor1' : 'cor2'"
            >
              <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="topone">
        <div class="img">
          <el-image
            :src="topList[2].coverImgUrl"
            style="width: 100px; height: 100px; float: left"
            fit="fill"
            :lazy="true"
          ></el-image>
          <br />
          <span class="span">{{ topList[2].name }}</span>
        </div>
        <div class="rank">
          <ul class="list">
            <li
              :key="index"
              v-for="(item, index) in topListDetail[2]"
              v-show="index < 10"
              :class="index % 2 == 0 ? 'cor1' : 'cor2'"
            >
              <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="topone">
        <div class="img">
          <el-image
            :src="topList[3].coverImgUrl"
            style="width: 100px; height: 100px; float: left"
            fit="fill"
            :lazy="true"
          ></el-image>
          <br />
          <span class="span">{{ topList[3].name }}</span>
        </div>

        <div class="rank">
          <ul class="list">
            <li
              :key="index"
              v-for="(item, index) in topListDetail[3]"
              v-show="index < 10"
              :class="index % 2 == 0 ? 'cor1' : 'cor2'"
            >
              <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import {
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
      //   //榜单1
      //   topListOne: [],
      //   //榜单2
      //   topListTwo: [],
      //   //榜单3
      //   topListThree: [],
      //   //榜单4
      //   topListFour: [],
      payloadNewAlbums: {
        limit: 5,
      },
      playlistPayload: {
        limit: 10,
      },
    };
  },

  mounted() {
    this.getPlayList();
    // this.getResource();
    this.getAlbum();
    this.getTopList();
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
      var res = await playlist(this.playlistPayload);
      this.playlists = res.playlists;
    },
    async getResource() {
      var res = await resource();
      this.individuation = res.recommend;
    },
    async getAlbum() {
      var res = await newAlbum();
      this.newAlbums = res.albums;
    },
    async getTopList() {
      var res = await topList();
      this.topList = res.list;
      this.getPlayListDetail();
    },
    async getPlayListDetail() {
      if (this.topList.length != 0) {
        for (let index = 0; index < 4; index++) {
          var res = await playlistDetail(this.topList[index].id);
          //   this.topListDetail[index] = res.playlist.tracks;
          this.$set(this.topListDetail, index, res.playlist.tracks);
        }
      }
      console.log(this.topListDetail);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding: 15px;
  .content_sort {
    display: flex;
    justify-content: left;
    padding-bottom: 10px;
    .el-row {
      width: 100%;
      .el-col {
        text-align: left;
      }
    }
    span {
      padding: 10px;
    }
  }
  .el-divider {
    margin: 2px;
  }
  .content_item {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .item_img {
      border-radius: 10px;
      padding: 10px;
      width: 18%;
      .image {
        position: relative;
        img {
          width: 100%;
          z-index: 1;
        }

        .imglove {
          height: 27px;
          text-align: left;
          position: absolute;
          z-index: 10;
          width: 100%;
          transform: translateY(-30px);
          background-color: #3b4250;
          opacity: 0.5;
          color: #fff;
          backdrop-filter: 0.5;
          .playcount {
            margin: 4px;
          }
        }
      }
      .image:hover {
        transform: scale(1.02);
      }

      .titledetail {
        text-align: left;
        font-size: 13px;
      }
    }
  }
  .content_newitem {
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    margin: 10px 0;
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    justify-content: center;
    // overflow: scroll;
    .newitem_img {
      width: 10.5vw;
      height: 10.5vw;
      padding: 10px 2px;

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
        margin: 0 20px;
        font-size: 6px;
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

        //   background-color: #3b4250;
      }
    }
  }
  .icon {
    margin: auto 5px;
    padding: 5px;

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
    padding-top: 10px;
    display: flex;
    .topone {
      background-color: #f4f4f4;
      flex: 1;
      //   padding: 15px;
      //   margin: 1px;
      border: 2px solid #f5f5f5;
      .span {
        font-weight: bold;
      }
      .img {
        height: 100px;
        padding: 10px;
      }
      .rank {
        padding: 0px 0px 0px;

        .list {
          // margin: 25px 0 0;
          padding: 0;
          list-style: none;
          text-align: left;
          li {
            padding: 5px;
            width: 15vw;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span {
              color: #666;

              font-size: 12px;
              line-height: 22px;

              &:first-child {
                background-color: #f5f5f5;
                border-radius: 20px;
                display: inline-block;
                font-size: 12px;
                font-weight: 600;
                margin-right: 24px;
                height: 20px;
                line-height: 20px;
                width: 20px;
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
          background-color: #FCFCFC;
          span {
            color: #666;
            font-size: 15px;
            line-height: 22px;
            &:first-child {
              background-color: #f5f5f5;
              border-radius: 20px;
              display: inline-block;
              font-size: 15px;
              font-weight: 600;
              margin-right: 24px;
              height: 20px;
              line-height: 20px;
              width: 20px;
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