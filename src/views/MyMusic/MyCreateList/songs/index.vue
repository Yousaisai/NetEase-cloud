<!--
 * @Descripttion: 我创建的歌单详情
 * @Author: Mr.You
 * @Date: 2020-10-14 20:43:36
 * @LastEditTime: 2020-10-26 13:56:53
-->
<template>
  <div class="content">
    <div class="content_detail">
      <div class="detail_pic">
        <el-image
          style="border-radius: 30%"
          :src="playListDetails.coverImgUrl + '?param=120y120'"
          :lazy="true"
        ></el-image>
      </div>
      <div class="detail_item" v-if="playListDetails.length != 0">
        <div class="title">
          <svg-icon
            icon-class="歌单"
            style="font-size: 28px; padding-right: 5px"
          />
          <span style="font-size: 20px; font-weight: bold">{{
            playListDetails.name
          }}</span>
        </div>
        <div class="nickname">
          <div class="img">
            <el-image
              style="width: 3em; border-radius: 50%"
              :src="playListDetails.creator.avatarUrl"
              :lazy="true"
            ></el-image>
          </div>

          <div class="span">
            <span>{{ playListDetails.creator.nickname }}</span>
          </div>
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
                playListDetails.subscribedCount
              }})
            </el-button>
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain
              ><svg-icon icon-class="转发" /> 转发 ({{
                playListDetails.shareCount
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
                playListDetails.commentCount
              }})</el-button
            >
          </div>
        </div>

  
      </div>
    </div>
    <div class="content_list_item">
      <div class="item_title">
        <!-- <span style="font-size: 20px; font-weight: bold">歌曲列表</span
        > -->
        <span style="float: right; font-size: 15px"
          >播放
          <span style="color: red; font-size: 10px">
            ({{ playListDetails.playCount }}次)</span
          ></span
        >
      </div>
      <el-divider></el-divider>
      <div class="item_table">
        <eltable :Songs="playListsong" />
      </div>
      <div class="comment">
        <comment :type="2" :commentData="JSON.stringify(commentData)">
        </comment>
      </div>
    </div>
  </div>
</template>





<script>
import eltable from "@/components/Talble";
import comment from "@/components/comment/index";
import {
  playlistDetail,
  millisToMinutesAndSeconds,
  PlayListComment,
} from "@/api/index";
export default {
  components: { eltable, comment },
  data() {
    return {
      play: false,
      //歌单详情
      playListDetails: [],
      //歌单曲目
      playListsong: [],
      commentData: {},
    };
  },
  computed: {
    total() {
      return this.playListsong.length;
    },
  },
  watch: {
    id(val) {
      this.getPlaylistDetail(val);
    },
  },
  methods: {
    async getPlaylistDetail(val) {
      var res = await playlistDetail({ id: val });
      this.playListDetails = res.playlist;
      this.playListsong = res.playlist.tracks;
    },

    async getPlayListComment(val) {
      var res = await PlayListComment({ id: val });
      this.commentData = res;
    },
    PlaySong(song, index) {
      this.$store.dispatch("PlaySongs", {
        oneSong: song,
        allSong: this.playListsong,
        indexSong: index,
      });
    },
    playAll() {
      this.$store.dispatch("PlaySongs", {
        oneSong: this.playListsong[0],
        allSong: this.playListsong,
        indexSong: 0,
      });
    },
  },
  props: ["id"],
};
</script>
<style lang="scss" scoped>
.content {
  background-color: #ffffff;

  flex-direction: column;
  .content_detail {
    // position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .detail_pic {
      margin: 25px 10px;
      // border: 1px solid #f5f5f5;
      padding: 5px;
      flex: 1;
    }
    .detail_item {
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      //   margin: 25px;
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
        cursor: pointer;
        display: flex;
        align-items: center;
        .btn_item {
          padding: 0 20px 0 0;
        }
      }
      .label {
        font-size: 13px;
        margin: 30px 0 0 0;
        padding: 0 10px 0 0;
        .el-button {
          transform: scale(0.8);
        }
      }
      .desc {
        margin: 20px 0 0 0;
        font-size: 13px;
        width: 600px;
      }
    }
  }

  .content_list_item {
    span {
      cursor: pointer;
    }
  }
  .item_table {
    width: 100%;
    margin: 0 auto;
  }
  .comment {
    width: 100%;
    margin: 0 auto;
  }
}
</style>