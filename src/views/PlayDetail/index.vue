<!--
 * @Descripttion: 歌曲详情，需要接受一个路由参数，音乐ID
 * @Author: Mr.You
 * @Date: 2020-10-20 09:53:28
 * @LastEditTime: 2020-10-20 11:47:37
-->
<template>
  <div class="content">
    <div class="content_poab" v-if="songDetail.al">
      <div class="detail">
        <div class="pic">
          <el-image
            style="border-radius: 180px"
            :src="songDetail.al.picUrl + '?param=180y180'"
            fit="fill"
            :lazy="true"
          ></el-image>
        </div>
        <div class="detail_content">
          <div class="title">
            <span style="padding-right: 2px; color: #9b0909"
              ><svg-icon icon-class="音乐"
            /></span>
            {{ songDetail.name }}
          </div>
          <div class="name">
            <span>歌手：</span><span>{{ songDetail.al.name }}</span>
          </div>
          <div class="album">
            <span>专辑：</span
            ><span
              style="padding: 10px"
              v-for="item in songDetail.ar"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
          <div class="btn">
            <div class="btn_item">
              <el-button type="primary" size="mini" plain
                ><svg-icon icon-class="播放 (3)" /> 全部播放</el-button
              >
            </div>
            <div class="btn_item">
              <el-button type="primary" size="mini" plain
                ><svg-icon icon-class="收 藏 (1)" /> 收藏
              </el-button>
            </div>
            <div class="btn_item">
              <el-button type="primary" size="mini" plain
                ><svg-icon icon-class="转发" /> 转发</el-button
              >
            </div>
            <div class="btn_item">
              <el-button type="primary" size="mini" plain>
                <svg-icon icon-class="下载" /> 下载
              </el-button>
            </div>
            <div class="btn_item">
              <el-button type="primary" size="mini" plain
                ><svg-icon icon-class="评 论" /> 评论
              </el-button>
            </div>
          </div>
          <div class="lyc">
            <li  v-for="(item,index ) in lyric" :key="index">
              {{item[0]}}{{ item[1] }}
            </li>
          </div>
        </div>
      </div>
      <div class="comment"></div>
    </div>
  </div>
</template>

<script>
import {
  millisToMinutesAndSeconds,
  PlayOneSong,
  SongDetail,
  SongLyric,
} from "@/api/index";

export default {
  data() {
    return {
      songDetail: {},
      lyric: [],
      currentLyric: 0,
    };
  },
  computed: {
    Id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    this.getPlayOneSong();
    this.getLyric();
  },
  methods: {
    async getPlayOneSong() {
      var res = await SongDetail(this.Id);
      console.log(res);
      this.songDetail = res.songs[0];
    },
    async getLyric(id) {
      //获取歌词
      this.currentLyric = 0;
      var res = await SongLyric(this.Id);
      if (res.nolyric) {
        this.$message({
          message: "抱歉，暂无歌词!",
          type: "warning",
        });
        this.lyricText = "";
        return;
      }

      res = res.lrc.lyric.split("\n");
      var lyric = {};
      let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
      res.map((val, index) => {
        var val = val.replace(/\s*/, "");
        var time = val.replace(pattern, "");
        var lyr = val.match(pattern);
        if (lyr == null) {
          lyr = ["[00:00.000]"];
        }
        lyric[index] = [...lyr, time];
      });
      for (const key in lyric) {
        let ly = lyric[key][0];
        const m = parseInt(ly.slice(1, 3));
        const s = parseInt(ly.slice(4, 6));
        const ms = parseInt(ly.slice(7, 10));
        lyric[key][0] = m * 60 * 1000 + s * 1000 + ms;
      }
      this.lyric = lyric;
      console.log(lyric);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  z-index: 1000000;
  .content_poab {
    background-color: #f5f5f5;
    position: absolute;
    top: -60px;
    width: calc(100vw - 130px);
    .detail {
      padding: 10px;
      width: 1080px;
      margin: 0 auto;
      background-color: #fff;
      display: flex;
      text-align: left;
      .pic {
        padding: 10px 20px;
      }

      .detail_content {
        padding: 10px;
        .title {
          padding: 10px;
          font-size: 28px;
        }

        .name {
          padding: 10px;
        }

        .album {
          padding: 10px;
        }

        .btn {
          padding: 10px;
          display: flex;
          align-items: center;
          .btn_item {
            padding: 0 20px 0 0;
          }
        }

        .lyc {
          padding: 10px;
        }
      }
    }

    .comment {
    }
  }
}
</style>