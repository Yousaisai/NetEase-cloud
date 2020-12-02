<!--
 * @Descripttion: 歌曲详情，需要接受一个路由参数，音乐ID
 * @Author: Mr.You
 * @Date: 2020-10-20 09:53:28
 * @LastEditTime: 2020-12-02 17:30:15
-->
<template>
  <div class="content" v-if="songDetail.al">
    <div class="detail">
      <div class="pic">
        <el-image
          style="border-radius: 180rem"
          :src="songDetail.al.picUrl + '?param=180y180'"
          fit="fill"
          :lazy="true"
        ></el-image>
      </div>
      <div class="detail_content">
        <div class="title">
          <span>歌曲： </span>
          <span style="font-size: 15rem"> {{ songDetail.name }}</span>
        </div>
        <div class="name">
          <span>歌手： </span>
          <router-link
            style="text-decoration: none"
            :to="{
              path: '/SingerDetail/Music',
              query: { id: songDetail.ar[0].id },
            }"
            ><span
              style="
                padding: 10rem;
                font-size: 15rem;
                color: #409eff;
                cursor: pointer;
              "
              v-for="item in songDetail.ar"
              :key="item.id"
              >{{ item.name }}</span
            ></router-link
          >
        </div>
        <div class="album">
          <span>专辑：</span>
          <router-link
            style="text-decoration: none"
            :to="{ path: '/NewAlbum', query: { id: songDetail.al.id } }"
            ><span style="font-size: 15rem; color: #409eff; cursor: pointer">{{
              songDetail.al.name
            }}</span>
          </router-link>
        </div>
        <div class="btn">
          <div class="btn_item">
            <el-button @click="PlayMusic" type="primary" size="mini" plain
              ><svg-icon icon-class="播放 (3)" /> 播放</el-button
            >
          </div>
          <div class="btn_item">
            <el-button type="primary" disabled size="mini" plain
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
              <svg-icon icon-class="下载" @click="download" /> 下载
            </el-button>
          </div>
          <div class="btn_item">
            <el-button type="primary" size="mini" plain
              ><svg-icon icon-class="评 论" /> 评论
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="lyc">
      <!-- 这个是显示收起的时候十行 -->
      <li
        v-for="(item, index) in lyric"
        :class="index == currentLyric ? 'corly' : 'none'"
        v-show="
          index > currentLyric - 5 && index < currentLyric + 5 && isShow <= 10
        "
        :key="index + '1'"
      >
        {{ item[1] }}
      </li>
      <!-- 这个显示展开的所有 -->
      <li
        v-for="(item, index) in lyric"
        :class="index == currentLyric ? 'corly' : 'none'"
        v-show="index <= isShow && isShow > 10"
        :key="index + '2'"
      >
        {{ item[1] }}
      </li>
      <li
        v-show="isShow == 10"
        style="color: #409eff; cursor: pointer"
        @click="isShow = 1000"
      >
        展开
      </li>
      <li
        v-show="isShow != 10"
        style="color: #409eff; cursor: pointer"
        @click="isShow = 10"
      >
        收起
      </li>
    </div>
    <div class="comment">
      <comment :type="0" :commentData="JSON.stringify(commentData)"> </comment>
    </div>
  </div>
</template>

<script>
import {
  millisToMinutesAndSeconds,
  PlayOneSong,
  SongDetail,
  SongLyric,
  MusicComment,
} from "@/api/index";

import comment from "@/components/comment/index";

export default {
  components: {
    comment,
  },
  data() {
    return {
      isShow: 10,
      songDetail: {},
      lyric: [],
      // currentLyric: 0,
      commentData: {},
    };
  },
  computed: {
    currentLyric() {
      return this.$store.state.currentLyric - 1;
    },
    Id() {
      return this.$route.query.id;
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id) {
        //加载数据
        this.getPlayOneSong();
        this.getLyric();
      }
    },
  },
  mounted() {
    this.getPlayOneSong();
    this.getLyric();
    this.getComment();
  },
  methods: {
    PlayMusic() {
      this.$store.dispatch("PlaySongs", {
        oneSong: this.songDetail,
        allSong: JSON.parse(localStorage.getItem("AllSongs")),
        indexSong: 0,
      });
    },
    async getPlayOneSong() {
      var res = await SongDetail(this.Id);
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
    },
    async getComment() {
      var res = await MusicComment({ id: this.Id });
      this.commentData = res;
    },
    download(song) {
      this.$store.dispatch("DownLoadMusic", this.Id);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  li {
    list-style: none;
  }
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  right: 2rem;
  .detail {
    width: 1080rem;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    text-align: left;
    .pic {
      padding: 30rem 20rem 20rem 20rem;
    }
    .detail_content {
      span {
        font-size: 18rem;
      }
      padding: 10rem;
      .title {
        padding: 10rem;
      }

      .name {
        padding: 10rem;
      }

      .album {
        padding: 10rem;
      }

      .btn {
        padding: 10rem;
        display: flex;
        align-items: center;
        .btn_item {
          padding: 0 20rem 0 0;
        }
      }
    }
  }
  .lyc {
    .corly {
      color: #00a4ff;
    }
    // padding: 0 10rem;
    width: 1080rem;
    margin: 0 auto;
    background-color: #fff;
    li {
      padding: 5rem;
      font-size: 13rem;
    }
  }
  .comment {
    width: 1080rem;
    margin: 0 auto;
    background-color: #fff;
  }
}
</style>