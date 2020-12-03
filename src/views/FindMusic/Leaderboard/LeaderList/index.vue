<!--
 * @Descripttion: 排行榜详情
 * @Author: Mr.You
 * @Date: 2020-10-14 20:43:36
 * @LastEditTime: 2020-12-03 11:53:28
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
        <el-table
          :row-class-name="tableRowClassName"
          @row-dblclick="dbclick"
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
                <svg-icon style="font-size: 35rem" icon-class="金牌" />
              </div>
              <div v-else-if="scope.$index == 1">
                <svg-icon style="font-size: 35rem" icon-class="银牌" />
              </div>
              <div v-else-if="scope.$index == 2">
                <svg-icon style="font-size: 35rem" icon-class="铜牌" />
              </div>
              <div v-else>
                <span> {{ scope.$index + 1 }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="歌曲标题">
            <template slot-scope="scope">
              <div>
                {{ scope.row.name }}
                <router-link
                  :to="{
                    path: '/PlayMv',
                    query: { mvid: scope.row.mv },
                  }"
                >
                  <span
                    ><svg-icon v-show="scope.row.mv != 0" icon-class="MV"
                  /></span>
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ar[0].name" show-overflow-tooltip label="歌手">
          </el-table-column>
          <el-table-column prop="al.name" show-overflow-tooltip label="专辑">
          </el-table-column>
          <el-table-column label="时长" align="right" min-width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.play">
                <span
                  style="padding: 10rem"
                  @click="PlaySong(scope.row, scope.$index)"
                >
                  <svg-icon style="font-size: 18rem" icon-class="播放 (6)" />
                </span>
                <span style="padding: 10rem">
                  <svg-icon
                    @click="AddMusic(scope.row)"
                    style="font-size: 16rem"
                    icon-class="加好 2-01"
                  />
                </span>
                <span style="padding: 10rem">
                  <svg-icon
                    style="font-size: 16rem; color: #909399"
                    icon-class="心 爱心 (2)"
                  />
                </span>

                <span style="padding: 10rem">
                  <svg-icon style="font-size: 16rem" icon-class="下载 (1)" />
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
    dbclick(row) {
      this.$store.dispatch("PlaySongs", {
        oneSong: row,
        allSong: this.playListsong,
        indexSong: row.index,
      });
    },

    AddMusic(song) {
      this.$store.dispatch("AddMusic", song);
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
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
  overflow: auto;

  .content_detail {
    position: absolute;
    height: 220rem;
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
        .el-button {
          font-size: 12rem !important;
        }
        cursor: pointer;
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
        width: 600rem;
      }
    }
  }

  .content_list_item {
    position: absolute;
    top: 310rem;
    width: 100%;
    span {
      cursor: pointer;
    }
    // margin: 10rem 50rem;
    .item_title {
      margin: 0 20rem;
      text-align: left;
    }
    .item_table {
      padding: 0 20rem;
    }
  }
}
.content::-webkit-scrollbar {
  width: 1rem;
}
</style>