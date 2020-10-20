<!--
 * @Descripttion: 热门推荐歌单详情
 * @Author: Mr.You
 * @Date: 2020-10-13 18:39:42
 * @LastEditTime: 2020-10-20 17:00:33
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
            <el-button type="primary" size="mini" @click="playAll" plain
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
        <div class="label">
          标签：<el-button
            v-for="(item, index) in playListDetails.tags"
            :key="index"
            type="info"
            size="mini"
            plain
            >{{ item }}</el-button
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
        <span style="font-size: 20px; font-weight: bold">歌曲列表</span
        ><span style="float: right; font-size: 15px"
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
    </div>
  </div>
</template>





<script>
import eltable from "@/components/Talble";
import { playlistDetail, millisToMinutesAndSeconds } from "@/api/index";
export default {
  components: { eltable },
  data() {
    return {
      play: false,
      //歌单详情
      playListDetails: [],
      //歌单曲目
      playListsong: [],
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

  mounted() {
    this.getPlaylistDetail();
  },
  methods: {
    async getPlaylistDetail() {
    
      const id = this.$route.query;
      var res = await playlistDetail(id);

      this.playListDetails = res.playlist;
      this.playListsong = res.playlist.tracks;
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
        width: 35vw;
      }
    }
  }

  .content_list_item {
    span {
      cursor: pointer;
    }
    margin: 10px 50px;
    .item_title {
      margin: 10px 0 0 0;
      text-align: left;
    }
    .item_table {
    }
  }
}
</style>