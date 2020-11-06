<!--
 * @Descripttion: 热门推荐歌单详情
 * @Author: Mr.You
 * @Date: 2020-10-13 18:39:42
 * @LastEditTime: 2020-10-26 13:40:13
-->
<template>
  <div class="content">
    <div class="content_detail">
      <div class="detail_pic">
        <el-image
          style="border-radius: 50%"
          :src="playListDetails.coverImgUrl"
          :lazy="true"
        ></el-image>
      </div>
      <div class="detail_item" v-if="playListDetails.length != 0">
        <div class="title">
          <svg-icon
            icon-class="歌单"
            style="font-size: 28rem; padding-right: 5rem"
          />
          <span style="font-size: 20rem; font-weight: bold">{{
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
            <el-button type="primary" size="mini" @click="playAll" plain
              ><svg-icon icon-class="播放 (3)" /> 全部播放</el-button
            >
          </div>
          <div class="btn_item">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="getSubPlaylist(playListDetails)"
              ><svg-icon icon-class="收 藏 (1)" />
              <span v-show="playListDetails.subscribed">已收藏</span>
              <span v-show="!playListDetails.subscribed">收藏</span>
              ({{ playListDetails.subscribedCount }})
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
        <div class="label">
          标签：
          <router-link
            v-for="(item, index) in playListDetails.tags"
            :to="{ path: '/SongList', query: { cat: item } }"
            :key="index"
          >
            <el-button type="info" size="mini" plain>{{
              item
            }}</el-button></router-link
          >
        </div>
        <div class="desc">
          <el-collapse value="string" accordion>
            <el-collapse-item :title="'简介：' + playListDetails.name" name="1">
              {{ playListDetails.description }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="content_list_item">
      <div class="item_title">
        <span style="font-size: 20rem; font-weight: bold">歌曲列表</span
        ><span style="float: right; font-size: 15rem"
          >播放
          <span style="color: red; font-size: 10rem">
            ({{ playListDetails.playCount }}次)</span
          ></span
        >
      </div>
      <el-divider></el-divider>
      <div class="item_table">
        <eltable :Songs="playListsong" />
      </div>
    </div>
    <div class="comment">
      <comment :type="2" :commentData="JSON.stringify(commentData)"> </comment>
    </div>
  </div>
</template>





<script>
import comment from "@/components/comment/index";
import eltable from "@/components/Talble";
import {
  playlistDetail,
  SubPlaylist,
  PlayListComment,
  millisToMinutesAndSeconds,
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
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id) {
        //加载数据
        this.getPlaylistDetail();
      }
    },
  },
  computed: {
    id() {
      return this.$route.query;
    },
  },
  mounted() {
    this.getPlaylistDetail();
    this.getPlayListComment();
  },
  methods: {
    async getPlaylistDetail() {
      // const id = this.$route.query;
      var res = await playlistDetail(this.id);
      this.playListDetails = res.playlist;
      this.playListsong = res.playlist.tracks;
    },
    async getPlayListComment() {
      var res = await PlayListComment(this.id);
      this.commentData = res;
    },
    async getSubPlaylist(val) {
      if (!val.subscribed) {
        var res = await SubPlaylist({ id: this.id.id, t: 1 });
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
        this.$set(val, "subscribed", true);
        return;
      } else {
        var res = await SubPlaylist({ id: this.id.id, t: 0 });
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
        this.$set(val, "subscribed", false);
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
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .detail_pic {
      margin: 25rem 10rem;
      // border: 1rem solid #f5f5f5;
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
        .btn_item {
          padding: 0 20rem 0 0;
        }
      }
      .label {
        font-size: 13rem;
        margin: 30rem 0 0 0;
        padding: 0 10rem 0 0;
        .el-button {
          transform: scale(0.8);
        }
      }
      .desc {
        margin: 20rem 0 0 0;
        font-size: 13rem;
        width: 35vw;
      }
    }
  }

  .content_list_item {
    span {
      cursor: pointer;
    }
    margin: 10rem 50rem;
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