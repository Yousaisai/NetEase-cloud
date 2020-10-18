<!--
 * @Descripttion: 新碟上架详情
 * @Author: Mr.You
 * @Date: 2020-10-14 16:23:34
 * @LastEditTime: 2020-10-18 14:36:07
-->

<template>
  <div class="content">
    <div class="content_detail">
      <div class="detail_pic">
        <el-image :src="albumDetails.picUrl" :lazy="true"></el-image>
      </div>
      <div class="detail_item" v-if="albumDetails.length != 0">
        <div class="title">
          <svg-icon
            icon-class="歌单"
            style="font-size: 28px; padding-right: 5px"
          />
          <span style="font-size: 20px; font-weight: bold">{{
            albumDetails.name
          }}</span>
        </div>

        <div class="btn">
          <div class="btn_item">
            <el-button type="primary" size="mini" plain @click="playAll"
              ><svg-icon icon-class="播放 (3)" /> 全部播放</el-button
            >
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain
              ><svg-icon icon-class="收 藏 (1)" /> 收藏 ({{
                albumDetails.info.likedCount
              }})
            </el-button>
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain
              ><svg-icon icon-class="转发" /> 转发 ({{
                albumDetails.info.shareCount
              }})</el-button
            >
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain>
              <svg-icon icon-class="下载" /> 下载
            </el-button>
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain
              ><svg-icon icon-class="评 论" /> 评论 ({{
                albumDetails.info.commentCount
              }})</el-button
            >
          </div>
        </div>
        <div class="label">
          <div style="padding: 5px 0">
            <span>歌手：{{ albumDetails.artist.name }}</span>
          </div>
          <div style="padding: 5px 0">
            <span>发行时间：{{ albumDetails.publishTime }}</span>
          </div>
          <div style="padding: 5px 0">
            <span>发行公司：{{ albumDetails.company }}</span>
          </div>
        </div>
        <div class="desc">
          <el-collapse accordion>
            <el-collapse-item :title="'简介：' + albumDetails.name" name="1">
              {{ albumDetails.description }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="content_list_item">
      <div class="item_title">
        <span style="font-size: 20px; font-weight: bold">歌曲列表</span>
      </div>
      <el-divider></el-divider>
      <div class="item_table"><eltable :Songs="playListsong" /></div>
    </div>
  </div>
</template>





<script>
import {
  playlistDetail,
  millisToMinutesAndSeconds,
  newAlbumDetail,
} from "@/api/index";
import eltable from "@/components/Talble";
export default {
  components: { eltable },
  data() {
    return {
      play: false,
      //歌单详情
      albumDetails: [],
      //歌单曲目
      playListsong: [],
  
    };
  },
  computed: {},

  mounted() {
    this.getPlaylistDetail();
  },
  methods: {
    async getPlaylistDetail() {
      const id = this.$route.query;
      var res = await newAlbumDetail({ ...id, limit: 30 });
      console.log(res);
      this.albumDetails = res.album;
      console.log(res);
      this.playListsong = res.songs;
    },
        playAll() {
      this.$store.dispatch("PlaySongs", {
        oneSong: this.playListsong[0],
        allSong: this.playListsong,
        indexSong: 0,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 auto;
  background-color: #ffffff;
  width: 1080px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content_detail {
    display: flex;
    flex-direction: row;
    justify-content: left;
    .detail_pic {
      margin: 25px 10px;
      //   border: 1px solid #f5f5f5;
      padding: 5px;
      flex: 1;
    }

    .detail_item {
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      margin: 25px;
      text-align: left;
      flex: 4;
      .title {
      }
      .nickname {
        margin: 20px 0;
        display: flex;
        align-items: center;
        .img {
        }
        .span {
          padding-left: 10px;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        margin: 20px 0 0 0;
        .btn_item {
          padding: 0 20px 0 0;
        }
      }
      .label {
        font-size: 13px;
        margin: 30px 0 0 0;
        display: flex;
        flex-direction: column;
      }
      .desc {
        margin: 20px 0 0 0;
        font-size: 13px;
        width: 35vw;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // overflow: hidden;
      }
    }
  }

  .content_list_item {
    margin: 10px 50px;
    span {
      cursor: pointer;
    }

    .item_title {
      margin: 10px 0 0 0;
      text-align: left;
    }
    .item_table {
    }
  }
}
</style>