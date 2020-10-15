<!--
 * @Descripttion: 新碟上架详情
 * @Author: Mr.You
 * @Date: 2020-10-14 16:23:34
 * @LastEditTime: 2020-10-15 10:35:56
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
            <el-button type="primary" size="mini" plain
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
      <div class="item_table"></div>
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
        style="width: 100%"
      >
        <!-- <el-table-column type="index" :index="indexMethod"> </el-table-column> -->
        <el-table-column label="序号" align="center" min-width="80">
          <template slot-scope="scope">
            <div v-if="scope.$index+ (currentPage - 1) * pageSize == 0">
              <svg-icon style="font-size: 35px" icon-class="金牌" />
            </div>
            <div v-else-if="scope.$index+ (currentPage - 1) * pageSize == 1">
              <svg-icon style="font-size: 35px" icon-class="银牌" />
            </div>
            <div v-else-if="scope.$index+ (currentPage - 1) * pageSize == 2">
              <svg-icon style="font-size: 35px" icon-class="铜牌" />
            </div>
            <div v-else>
              <span>
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="歌曲标题"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="ar[0].name"
          show-overflow-tooltip
          label="歌手"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="al.name"
          show-overflow-tooltip
          label="专辑"
          min-width="180"
        >
        </el-table-column>
        <!-- <el-table-column prop="dt" label="时长" min-width="150">
        </el-table-column> -->
        <el-table-column label="时长" align="right" min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.play">
              <span style="padding: 10px">
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
</template>





<script>
import {
  playlistDetail,
  millisToMinutesAndSeconds,
  newAlbumDetail,
} from "@/api/index";
export default {
  components: {},
  data() {
    return {
      play: false,
      //歌单详情
      albumDetails: [],
      //歌单曲目
      playListsong: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    total() {
      return this.playListsong.length;
    },
  },

  mounted() {
    
    this.getPlaylistDetail();
  },
  methods: {
    async getPlaylistDetail() {
      const id = this.$route.query;
      var res = await newAlbumDetail({ ...id, limit: 30 });
      this.albumDetails = res.album;
      this.playListsong = res.songs;
    },
    indexMethod(index) {
      return index * 2;
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
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 auto;
  background-color: #ffffff;
  width:1080px;
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