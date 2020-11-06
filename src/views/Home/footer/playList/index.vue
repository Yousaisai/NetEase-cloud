<!--
 * @Descripttion: 播放列表
 * @Author: Mr.You
 * @Date: 2020-10-29 09:24:46
 * @LastEditTime: 2020-10-29 13:13:09
-->
<template>
  <div class="rank">
    <div class="title" >
      <span>播放列表({{ PlayList.length }})</span>
    </div>

    <ul class="list">
      <li
        :key="index"
        v-for="(item, index) in PlayList"
        :id="index"
        class="cor"
      >
        <div class="spanhide">
          <span v-show="PlayIndex != index" style="padding: 0 10rem 0 0">{{
            index + 1
          }}</span>
          <img
            style="color: #666666; padding: 0 5rem 0 0"
            v-show="PlayIndex == index"
            src="@/icons/pic/wave.gif"
          />
          <span>{{ item.name }}</span>
        </div>

        <div class="svghide">
          <svg-icon
            @click="PlaySong(item, PlayList, index)"
            style="padding: 0 5rem"
            icon-class="播放 (6)"
          />
          <svg-icon style="padding: 0 5rem" icon-class="下载 (1)" />
        </div>
        <div class="other">
          <div class="name">{{ item.ar[0].name }}</div>
          <div class="time">{{ milltosecond(item.dt) }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { millisToMinutesAndSeconds, SongLyric } from "@/api/index";

export default {
  data() {
    return {};
  },
  computed: {
    PlayList() {
      return this.$store.state.AllSongs.length == 0
        ? JSON.parse(localStorage.getItem("AllSongs"))
        : this.$store.state.AllSongs;
    },
    PlayIndex() {
      return this.$store.state.IndexSong;
    },
  },
  methods: {
    //转换秒
    milltosecond(val) {
      return millisToMinutesAndSeconds(val);
    },
    PlaySong(song, allsong, index) {
      this.$store.dispatch("PlaySongs", {
        oneSong: song,
        allSong: allsong,
        indexSong: index,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.rank {

  .title {
    position: sticky;
    top: 0;
    background-color: #1f1f1f;
    margin: auto 0;
    font-size: 14rem;
    color: #666666;
    padding: 10rem 0;
    width: 400rem;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  .list {

    padding: 0;
    list-style: none;

    li {
      padding: 2rem 10rem;
      display: flex;
      .spanhide {
        flex: 5;
        font-size: 12rem;
        // width: 15vw;
        margin: auto 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .svghide {
        flex: 2;
        color: #666666;
        color: #1f1f1f;
        cursor: pointer;
        font-size: 14rem;
        margin: auto 0;
      }
      .other {
        font-size: 12rem;
        flex: 3;
        float: right;
        display: flex;
        color: #666666;
        margin: auto 0;
        position: relative;
        .name {
          padding: 0 10rem;
          text-overflow: ellipsis;
          width: 50%;
          white-space: nowrap;
          overflow: hidden;
        }
        .time {
          position: absolute;
          right: 1rem;
          padding: 0 10rem;
        }
      }
      span {
        color: #666;
        font-size: 12rem;
        line-height: 22rem;
        &.active {
          background-color: #314659;
          color: #fff;
        }
      }
    }
  }
  .cor {
    background-color: #1f1f1f;
  }

  li:hover {
    background-color: #100f0f;
    .svghide {
      color: #666666;
      cursor: pointer;
      font-size: 14rem;
      margin: auto 0;
    }
  }
}
</style>