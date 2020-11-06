<!--
 * @Descripttion: 新碟上架详情
 * @Author: Mr.You
 * @Date: 2020-10-14 16:23:34
 * @LastEditTime: 2020-10-26 12:18:14
-->

<template>
  <div class="content">
    <div class="content_detail">
      <div class="detail_pic">
        <el-image
          style="border-radius: 50%"
          :src="albumDetails.picUrl"
          :lazy="true"
        ></el-image>
      </div>
      <div class="detail_item" v-if="albumDetails.length != 0">
        <div class="title">
          <svg-icon
            icon-class="歌单"
            style="font-size: 28rem; padding-right: 5rem"
          />
          <span style="font-size: 20rem; font-weight: bold">{{
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
            <el-button
              type="primary"
              size="mini"
              plain
              @click="getSubAlbum(albumDetails.info)"
              ><svg-icon icon-class="收 藏 (1)" /><span
                v-show="albumDetails.info.liked"
                >已收藏</span
              >
              <span v-show="!albumDetails.info.liked">收藏</span> ({{
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
          <div style="padding: 5rem 0">
            <span>歌手：{{ albumDetails.artist.name }}</span>
          </div>
          <div style="padding: 5rem 0">
            <span>发行时间：{{ dataForm(albumDetails.publishTime) }}</span>
          </div>
          <div style="padding: 5rem 0">
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
        <span style="font-size: 20rem; font-weight: bold">歌曲列表</span>
      </div>
      <el-divider></el-divider>
      <div class="item_table"><eltable :Songs="playListsong" /></div>
    </div>
    <div class="comment">
      <comment :type="3" :commentData="JSON.stringify(commentData)"> </comment>
    </div>
  </div>
</template>





<script>
import {
  playlistDetail,
  millisToMinutesAndSeconds,
  newAlbumDetail,
  dataType,
  AlbumComment,
  SubAlbum,
} from "@/api/index";
import comment from "@/components/comment/index";

import eltable from "@/components/Talble";
export default {
  components: { eltable, comment },
  data() {
    return {
      play: false,
      //歌单详情
      albumDetails: [],
      //歌单曲目
      playListsong: [],
      commentData: {},
    };
  },
  computed: {
    Id() {
      return this.$route.query.id;
    },
  },

  mounted() {
    this.getPlaylistDetail();
    this.getComment();
  },
  methods: {
    dataForm(val) {
      return dataType(val);
    },
    async getPlaylistDetail() {
      const id = this.$route.query;
      var res = await newAlbumDetail({ ...id, limit: 30 });
      this.albumDetails = res.album;
      this.playListsong = res.songs;
    },
    async getComment() {
      var res = await AlbumComment({ id: this.Id });
      this.commentData = res;
    },
    async getSubAlbum(val) {
      if (!val.liked) {
        var res = await SubAlbum({ id: this.Id, t: 1 });
        if (res.code != 200) {
          this.$message({
            message: "收藏失败",
            type: "warning",
          });
          return;
        }
        this.$message({
          message: "收藏成功",
          type: "success",
        });
        this.$set(val, "liked", true);
        return;
      } else {
        var res = await SubAlbum({ id: this.Id, t: 0 });
        if (res.code != 200) {
          this.$message({
            message: "取消收藏失败",
            type: "warning",
          });
          return;
        }
        this.$message({
          message: "已取消",
          type: "success",
        });
        this.$set(val, "liked", false);
      }
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
  width: 1080rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content_detail {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: left;
    .detail_pic {
      margin: 25rem 10rem;
      //   border: 1rem solid #f5f5f5;
      padding: 5rem;
      flex: 1;
    }

    .detail_item {
      border-radius: 2rem;
      display: flex;
      flex-direction: column;
      margin: 25rem;
      text-align: left;
      flex: 4;
      .title {
      }
      .nickname {
        margin: 20rem 0;
        display: flex;
        align-items: center;
        .img {
        }
        .span {
          padding-left: 10rem;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        margin: 20rem 0 0 0;
        .btn_item {
          padding: 0 20rem 0 0;
        }
      }
      .label {
        font-size: 13rem;
        margin: 30rem 0 0 0;
        display: flex;
        flex-direction: column;
      }
      .desc {
        margin: 20rem 0 0 0;
        font-size: 13rem;
        width: 35vw;
      }
    }
  }

  .content_list_item {
    margin: 10rem 50rem;
    span {
      cursor: pointer;
    }

    .item_title {
      margin: 10rem 0 0 0;
      text-align: left;
    }
    .item_table {
    }
  }
  .comment {
    padding-top: 30rem;
  }
}
</style>