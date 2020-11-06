<!--
 * @Descripttion: 歌手详情
 * @Author: Mr.You
 * @Date: 2020-10-18 13:24:07
 * @LastEditTime: 2020-10-26 15:35:54
-->
<template>
  <div class="content">
    <div class="content_detail">
      <div class="pic">
        <el-image
          style="border-radius: 50%"
          :src="artist.picUrl + '?param=150y150'"
          fit="fill"
          :lazy="true"
        ></el-image>
      </div>
      <div class="desc">
        <div class="name">{{ artist.name }}</div>
        <div class="descnum">
          单曲： <span>{{ artist.musicSize }}</span> 专辑：
          <span>{{ artist.albumSize }}</span
          >MV：<span>{{ artist.mvSize }}</span>
        </div>
        <div class="btn">
          <div class="btn_item">
            <el-button type="primary" size="mini" plain @click="playAll"
              ><svg-icon icon-class="播放 (3)" /> 全部播放</el-button
            >
          </div>

          <div class="btn_item">
            <el-button type="primary" size="mini" plain    @click="getSubArtist(artist)"
              ><svg-icon icon-class="收 藏 (1)" />
              <span v-show="artist.followed">已收藏</span>
              <span v-show="!artist.followed">收藏</span>
            </el-button>
          </div>
        </div>
        <div class="singerdesc">
          <el-collapse accordion>
            <el-collapse-item :title="'简介：' + artist.name" name="1">
              {{ artist.briefDesc }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="content_songs">
      <div class="menu">
        <el-menu
          :default-active="initMenu + '?id=' + singerId.id"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item :index="'/SingerDetail/Music?id=' + singerId.id"
            >单曲</el-menu-item
          >
          <el-menu-item :index="'/SingerDetail/Album?id=' + singerId.id"
            >专辑</el-menu-item
          >
          <el-menu-item :index="'/SingerDetail/Mv?id=' + singerId.id"
            >MV</el-menu-item
          >
          <el-menu-item :index="'/SingerDetail/Desc?id=' + singerId.id"
            >简介</el-menu-item
          >
        </el-menu>
      </div>
      <div class="menuItem">
        <div class="item_table">
          <router-view :id="singerId" :hotSongs="hotSongs"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eltable from "@/components/Talble";

import { SingersOne, SubArtist } from "@/api/index";
export default {
  components: { eltable },
  data() {
    return {
      artist: {}, //歌手信息
      hotSongs: [], //热门歌曲
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id) {
        //加载数据
        this.getSingersOne();
      }
    },
  },
  mounted() {
    this.getSingersOne();
  },
  computed: {
    singerId() {
      return this.$route.query;
    },
    initMenu() {
      return this.$route.path;
    },
  },
  methods: {
    async getSingersOne() {
      var id = this.$route.query;
      var res = await SingersOne(id);
      console.log(res);
      this.artist = res.artist;
      this.hotSongs = res.hotSongs;
    },
    async getSubArtist(val) {

      if (!val.followed) {
        var res = await SubArtist({ id: this.singerId.id, t: 1 });
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
        this.$set(val, "followed", true);
        return;
      } else {
        var res = await SubArtist({ id: this.singerId.id, t: 0 });
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
        this.$set(val, "followed", false);
      }
    },
    playAll() {
      this.$store.dispatch("PlaySongs", {
        oneSong: this.hotSongs[0],
        allSong: this.hotSongs,
        indexSong: 0,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 1080rem;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  padding: 10rem;
  flex-direction: column;
  .content_detail {
    margin: 10rem 50rem;
    flex: 1;
    display: flex;
    align-items: center;
    .pic {
      flex: 1;
    }

    .desc {
      flex: 4;
      display: flex;
      flex-direction: column;
      text-align: left;
      .name {
        flex: 2;
        font-size: 30rem;
        font-weight: 500;
        padding: 10rem 0;
      }

      .descnum {
        font-size: 18rem;
        color: #999;
        flex: 1;
        padding: 10rem 0;
        span {
          margin-right: 30rem;
          color: #666;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        margin: 20rem 0 0 0;
        .btn_item {
          padding: 0 20rem 0 0;
        }
      }
      .singerdesc {
        margin: 20rem 0 10rem 0;
        flex: 2;
      }
    }
  }

  .content_songs {
    margin: 10rem 50rem;
    flex: 1;
    .menu {
    }
    .menuItem {
      margin: 20rem 0;
      .item_table {
      }
    }
  }
}
</style>