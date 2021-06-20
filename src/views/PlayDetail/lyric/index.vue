<template>
  <div class="content">
    <div class="title" v-if="lyric.length != 0">
      <div class="song">
        {{ watchsong.time != 0 ? watchsong.onesong.name : onesong.name }}
      </div>
      <div class="singer">
        {{
          watchsong.time != 0
            ? watchsong.onesong.ar[0].name
            : onesong.ar[0].name
        }}
      </div>
    </div>
    <div class="ric">
      <ul :style="{ transform: `translateY(-${transY / 100}rem)` }">
        <li
          v-for="(item, index) in lyric"
          :class="index == currentLyric ? 'corly' : 'none'"
          :key="index"
        >
          {{ item ? item[1] : "" }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { SongLyric } from "@/api/index";
export default {
  data() {
    return { lyric: [], isShow: 20, transY: 0, nowpage: 9 };
  },
  mounted() {
    this.getLyric();
  },
  computed: {
    currentLyric() {
      let cur = this.$store.state.currentLyric - 1;
      console.log("cur: ", cur);
      if (cur >= 10 && cur < this.lyric.length) {
        this.transY = (cur - this.nowpage) * 28; //作用是为了从其他页面来的没有定位到歌词
        console.log('this.transY: ', this.transY);
      }
      return cur;
    },
    onesong() {
      return JSON.parse(localStorage.getItem("SongDetail"))
        ? JSON.parse(localStorage.getItem("SongDetail")).onesong
        : [];
    },
    watchsong() {
      return this.$store.state.SongDetail;
    },
  },
  watch: {
    watchsong() {
      this.getLyric();
      this.transY = 0;
    },
  },
  methods: {
    async getLyric() {
      if (this.watchsong.time == 0 && this.onesong.length == 0) {
        this.$message({
          background: "#393239",
          color: "#c5c5c5",
          message: "暂无播放资源",
        });
        return;
      }
      //获取歌词
      var res = await SongLyric(
        this.watchsong.time != 0 ? this.watchsong.onesong.id : this.onesong.id
      );
      if (res.nolyric) {
        this.$message({
          background: "#393239",
          color: "#c5c5c5",
          message: "抱歉，暂无歌词!",
        });
        this.lyricText = "";
        return;
      }
      res = res.lrc.lyric.split("\n");

      var lyric = [];
      let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
      res.map((val, index) => {
        var val = val.replace(/\s*/, "");
        var time = val.replace(pattern, "");
        var lyr = val.match(pattern);
        if (lyr == null) {
          lyr = ["[00:00.000]"];
        }
        lyric.push([...lyr, time]);
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
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  background: #fff;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  overflow: auto;
  .title {
    background: #fff;
    text-align: center;
    padding: 10rem 0;
    .song {
      font-size: 18rem;
    }
    .singer {
      font-size: 12rem;
      transform: scale(0.85);
    }
  }
  .ric {
    background: #fff;
    font-size: 14rem;
    overflow: hidden;
    ul {
      transition: transform 1s;
    }
    ul li {
      background: #fff;
      line-height: 28rem;
      font-size: 13rem;
      list-style: none;
    }
    li:hover {
      color: #fff;
      animation: horcor 2s;
    }
    .corly {
      color: #31c27c;
      transform: scale(1.2);
      transition: transform 2s;
      animation: cor 2s infinite;
    }
  }
  @keyframes horcor {
    0% {
      color: #31c27c;
      transform: scale(1);
    }
    50% {
      color: #419afb;
      transform: scale(1.2);
    }
    100% {
      color: #31c27c;
      transform: scale(1);
    }
  }
  @keyframes cor {
    0% {
      color: #31c27c;
    }
    25% {
      color: #419afb;
    }
    50% {
      color: #31c27c;
    }
    75% {
      color: #419afb;
    }
    100% {
      color: #31c27c;
    }
  }
  .isNull {
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
  }
}
</style>