<!--
 * @Descripttion: 排行榜详情
 * @Author: Mr.You
 * @Date: 2020-10-14 20:43:36
 * @LastEditTime: 2020-10-18 14:46:18
-->
<template>
  <div class="content">
    <div class="content_detail">
      <div class="detail_pic">
        <el-image :src="playListDetails.coverImgUrl" :lazy="true"></el-image>
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
        <el-table

          stripe
          :data="
            playListsong.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          @cell-mouse-enter="cellenter"
          @cell-mouse-leave="cellleave"
        >
          <el-table-column label="序号" align="center" min-width="30">
            <template slot-scope="scope">
              <div v-if="scope.$index == 0">
                <svg-icon style="font-size: 35px" icon-class="金牌" />
              </div>
              <div v-else-if="scope.$index == 1">
                <svg-icon style="font-size: 35px" icon-class="银牌" />
              </div>
              <div v-else-if="scope.$index == 2">
                <svg-icon style="font-size: 35px" icon-class="铜牌" />
              </div>
              <div v-else>
                <span> {{ scope.$index + 1 }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="歌曲标题">
          </el-table-column>
          <el-table-column prop="ar[0].name" show-overflow-tooltip label="歌手">
          </el-table-column>
          <el-table-column prop="al.name" show-overflow-tooltip label="专辑">
          </el-table-column>
          <el-table-column label="时长" align="right" min-width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.play">
                <span
                  style="padding: 10px"
                  @click="PlaySong(scope.row, scope.$index)"
                >
                  <svg-icon style="font-size: 18px" icon-class="播放 (6)" />
                </span>
                <span style="padding: 10px">
                  <svg-icon style="font-size: 16px" icon-class="加好 2-01" />
                </span>
                <span style="padding: 10px">
                  <svg-icon
                    style="font-size: 16px; color: #909399"
                    icon-class="心 爱心 (2)"
                  />
                </span>

                <span style="padding: 10px">
                  <svg-icon style="font-size: 16px" icon-class="下载 (1)" />
                </span>
              </div>
              <div v-if="!scope.row.play">
                {{ milltosecond(scope.row.dt) }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>





<script>
import { playlistDetail, millisToMinutesAndSeconds } from "@/api/index";
export default {
  components: {},
  data() {
    return {
      play: false,
      //歌单详情
      playListDetails: [],
      //歌单曲目
      playListsong: [],
      currentPage: 1,
      pageSize: 100,
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

    cellenter(row, column, cell, event) {
      this.$set(row, "play", true);
    },

    cellleave(row, column, cell, event) {
      this.$set(row, "play", false);
    },
    milltosecond(val) {
      return millisToMinutesAndSeconds(val);
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  .content_detail {
    position: absolute;
    height: 35vh;
    display: flex;
    flex-direction: row;
    justify-content: left;
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
    position: absolute;
    top: 35vh;
    width: 100%;
    span {
      cursor: pointer;
    }
    // margin: 10px 50px;
    .item_title {
      margin: 0 20px;
      text-align: left;
    }
    .item_table {
      padding: 0 20px;
    }
  }
}
</style>