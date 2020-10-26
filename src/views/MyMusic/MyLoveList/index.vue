<!--
 * @Descripttion: 收藏歌单
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:04
 * @LastEditTime: 2020-10-26 15:21:51
-->
<template>
  <div class="content1">
    <div class="content_menu">
      <h3 style="padding-left: 12px">我收藏的歌单</h3>
      <el-menu :default-active="initMenu" @select="handleSelect">
        <el-menu-item
          v-for="(item, index) in userList"
          :key="index"
          :index="item.id.toString()"
          v-show="item.ordered"
        >
          <el-image
            :src="item.coverImgUrl"
            style="width: 50px; padding-right: 10px"
            :lazy="true"
          ></el-image>
          <span slot="title"
            >{{ item.name.slice(0, 5) }}
            <span v-show="item.name.length > 5" style="font-size: 15px"
              >...</span
            >
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content_detail"><songs :id="initId" /></div>
  </div>
</template>





<script>
import { getToken } from "@/utils/cookie.js";
import { topList } from "@/api/index.js";
import songs from "./songs";
import { UserPlaylist } from "@/api/index";
export default {
  components: {
    songs,
    // LeaderList,
  },

  data() {
    return {
      userList: [],
      NewId: "",
    };
  },
  computed: {
    account() {
      return JSON.parse(getToken("account"));
    },
    initId() {
      if (this.NewId == "") {
        return this.userList.length != 0 && this.userList[0].id;
      } else {
        return this.NewId;
      }
    },
    initMenu() {
      var ID = this.$route.query.id;
      if (ID) {
        return ID;
      }
      if (this.userList.length != 0) {
        return this.userList[0].id.toString();
      }
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

    handleSelect(key, keyPath) {
      this.$router.push({ path: "/MyLoveList", query: { id: key } });
      this.NewId = key;
    },
  },
};
</script>
<style lang="scss" scoped>
.content1 {
  background-color: #fff;
  display: flex;
  .content_menu {
    flex: 1;
    text-align: left;
    .el-image {
      border-radius: 5px;
    }
  }
  .content_detail {
    margin: 10px;
    flex: 6;
  }
}
</style>