<!--
 * @Descripttion: 我创建的歌单
 * @Author: Mr.You
 * @Date: 2020-10-12 20:31:43
 * @LastEditTime: 2020-10-26 12:53:43
-->
<template>
  <div class="content">
    <div class="content_item">
      <div
        class="item_img"
        v-show="!item.ordered"
        v-for="(item, index) in userList"
        :key="index"
      >
        <router-link :to="{ name: 'Playlist', query: { id: item.id } }">
          <div class="image">
            <img :src="item.coverImgUrl" :alt="item.name" />
            <div class="imglove">
              <div class="playcount">
                <svg-icon icon-class="收听量" style="padding-right: 5px" />{{
                  item.playCount > 100000
                    ? parseInt(item.playCount / 10000) + "W"
                    : item.playCount
                }}<svg-icon icon-class="播放" style="float: right" />
              </div>
              <div class="player"></div>
            </div></div
        ></router-link>

        <div class="titledetail">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import { getToken } from "@/utils/cookie.js";

import { UserPlaylist } from "@/api/index";
export default {
  data() {
    return {
      userList: [],
      userListPayload: {},
    };
  },

  computed: {
    account() {
      return JSON.parse(getToken("account"));
    },
  },
  mounted() {
    this.getUserPlaylist();
  },
  methods: {
    async getUserPlaylist() {
      var res = await UserPlaylist({ uid: this.account.id });
      this.userList = res.playlist;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {

  background-color: #fff;
  min-height: calc(100vh - 130px);
  margin: 0 auto;
  width: 1080px;
  padding: 10px;
  .content_item {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .item_img {
      border-radius: 10px;
      padding: 10px;
      width: 18%;
      .image {
        position: relative;
        img {
          width: 100%;
          z-index: 1;
        }

        .imglove {
          height: 27px;
          text-align: left;
          position: absolute;
          z-index: 10;
          width: 100%;
          transform: translateY(-30px);
          background-color: #3b4250;
          opacity: 0.5;
          color: #fff;
          backdrop-filter: 0.5;
          .playcount {
            margin: 4px;
          }
        }
      }
      .image:hover {
        transform: scale(1.02);
      }

      .titledetail {
        text-align: center;
        padding-top: 5px;
        font-size: 13px;
       
      }
    }
  }
}
</style>