<!--
 * @Descripttion: 收藏歌单
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:04
 * @LastEditTime: 2020-12-02 15:56:45
-->
<template>
  <div class="content1">
    <div class="content_menu">
      <h5 style="padding-left: 12rem">我收藏的歌单</h5>
      <el-menu :default-active="initMenu" @select="handleSelect">
        <el-menu-item
          v-for="(item, index) in userList"
          :key="index"
          :index="item.id.toString()"
          v-show="item.ordered"
          class="el-menu-item"
        >
          <el-image :src="item.coverImgUrl" :lazy="true"></el-image>
          <span slot="title"
            >{{ item.name.slice(0, 5) }}
            <span v-show="item.name.length > 5">...</span>
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
      if (this.$route.query.id == key) {
        return;
      }
      this.$router.push({ query: { id: key } });
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
    .el-menu-item {
      display: flex;
      align-items: center;
    }
    .el-image {
      border-radius: 10rem;
      display: flex;
      margin: 0 10rem 0 0;
      align-items: center;
      width: 30rem;
      height: 30rem;
    }
  }
  .content_detail {
    margin: 10rem;
    flex: 6;
  }
}
</style>