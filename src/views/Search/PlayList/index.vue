<!--
 * @Descripttion: 歌单导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:11
 * @LastEditTime: 2020-12-02 17:10:53
-->
<template>
  <div class="content">
    <div class="content_item">
      <div
        class="item_img"
        v-for="(item, index) in searchRe.playlists"
        :key="index"
      >
        <router-link :to="{ name: 'Playlist', query: { id: item.id } }">
          <div class="image">
            <img :src="item.coverImgUrl + '?param=250y250'" :alt="item.name" />
            <!-- <div class="imglove"> -->
              <!-- <div class="playcount"> -->
                <!-- <div class="shouting">
                  <svg-icon icon-class="收听量" style="padding-right: 5rem" />{{
                    item.playCount > 100000
                      ? parseInt(item.playCount / 10000) + "W"
                      : item.playCount
                  }}
                </div>
                <div class="bofang">
                  <svg-icon icon-class="播放" style="float: right" />
                </div> -->
              <!-- </div> -->
              <!-- <div class="player"></div> -->
            <!-- </div> -->
            </div
        ></router-link>

        <div class="titledetail">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { playlist, playListCat } from "@/api/index.js";
export default {
  props: ["searchRe"],
  data() {
    return {
      //全部歌单
      playlists: [],
      //歌单类型
      categories: [],
      //歌单细分类
      detailCat: [],
      playlistPayload: {
        order: "",
        cat: "全部",
        limit: "",
      },
      checkList: "",
    };
  },
  mounted() {
    var CAT = this.$route.query.cat;
    if (CAT) {
      this.playlistPayload.cat = CAT;
    }
    this.getPlayList();
    this.getPlayListCat();
  },
  methods: {
    checkCat(val) {
      this.playlistPayload.cat = val;
      this.getPlayList();
    },

    async getPlayList() {
      var res = await playlist(this.playlistPayload);
      this.playlists = res.playlists;
    },
    async getPlayListCat() {
      var res = await playListCat();
      (this.categories = res.categories), (this.detailCat = res.sub);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 1080rem;
  margin: 0 auto;
  background-color: #ffffff;

  .content_item {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .item_img {
      border-radius: 10rem;
      padding: 10rem;
      width: 18%;
      .image {
        position: relative;
        img {
          width: 100%;
          z-index: 1;
        }

        .imglove {
          height: 32rem;
          text-align: left;
          position: absolute;
          z-index: 10;
          width: 100%;
          transform: translateY(-36rem);
          background-color: #3b4250;
          opacity: 0.5;
          color: #fff;
          backdrop-filter: 0.5;
          .playcount {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 10rem;
            .shouting {
              flex: 3;
            }
            .bofang {
              flex: 1;
            }
          }
        }
      }
      .image:hover {
        transform: scale(1.02);
      }

      .titledetail {
        text-align: left;
        font-size: 13rem;
      }
    }
  }
}
</style>