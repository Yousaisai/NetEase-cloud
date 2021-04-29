<!--
 * @Descripttion: 单曲列表
 * @Author: Mr.You
 * @Date: 2020-10-21 09:55:07
 * @LastEditTime: 2020-11-25 09:35:41
-->
<template>
  <div class="content">
    <el-table
      stripe
      @row-dblclick="dbclick"
      :data="Songs.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      @cell-mouse-enter="cellenter"
      @cell-mouse-leave="cellleave"
      style="width: 100%"
    >
      <el-table-column label="序号" align="center" min-width="80">
        <template slot-scope="scope">
          <div v-if="scope.$index + (currentPage - 1) * pageSize == 0">
            <svg-icon style="font-size: 35rem" icon-class="金牌" />
          </div>
          <div v-else-if="scope.$index + (currentPage - 1) * pageSize == 1">
            <svg-icon style="font-size: 35rem" icon-class="银牌" />
          </div>
          <div v-else-if="scope.$index + (currentPage - 1) * pageSize == 2">
            <svg-icon style="font-size: 35rem" icon-class="铜牌" />
          </div>
          <div v-else>
            <span> {{ scope.$index + (currentPage - 1) * pageSize + 1 }}</span>
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
        prop="artists[0].name"
        show-overflow-tooltip
        label="歌手"
        min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="album.name"
        show-overflow-tooltip
        label="专辑"
        min-width="180"
      >
      </el-table-column>
      <el-table-column label="时长" align="right" min-width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.play">
            <span
              @click="PlaySong(scope.row, scope.$index)"
              style="padding: 10rem"
            >
              <svg-icon style="font-size: 18px" icon-class="播放 (6)" />
            </span>
            <span style="padding: 10rem">
              <svg-icon
                @click="AddMusic(scope.row)"
                style="font-size: 16px"
                icon-class="加好 2-01"
              />
            </span>
            <span style="padding: 10rem">
              <svg-icon
                style="font-size: 16px; color: #909399"
                icon-class="心 爱心 (2)"
              />
            </span>
            <span style="padding: 10rem">
              <svg-icon
                style="font-size: 16px"
                @click="download(scope.row)"
                icon-class="下载 (1)"
              />
            </span>
          </div>
          <div v-if="!scope.row.play">
            {{ milltosecond(scope.row.duration) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
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
  computed: {},
  props: ["searchRe"],
  watch: {
    searchRe() {
      this.Songs = this.searchRe.songs;
    },
  },
  data() {
    return {
      Songs: [],
      play: false,
      //歌单详情

      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    total() {
      return this.Songs.length;
    },
  },

  mounted() {},
  methods: {
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
        allSong: this.Songs,
        indexSong: index,
      });
    },
    AddMusic(song) {
      this.$store.dispatch("AddMusic", song);
      this.$message({
        message: "添加成功",
        type: "success",
      });
    },
    dbclick(row) {
      this.$store.dispatch("PlaySongs", {
        oneSong: row,
        allSong: this.Songs,
        indexSong: row.index,
      });
    },
    download(song) {
      this.$store.dispatch("DownLoadMusic", song.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding: 10rem 50rem;
  span {
    cursor: pointer;
  }
}
</style>