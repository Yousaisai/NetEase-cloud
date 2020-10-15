<!--
 * @Descripttion: 排行榜导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:04
 * @LastEditTime: 2020-10-15 14:57:16
-->
<template>
  <div class="content1">
    <div class="content_menu">
      <h3 style="padding-left: 12px">网易云音乐榜</h3>
      <el-menu :default-active="initMenu" @select="handleSelect">
        <el-menu-item
          v-for="(item, index) in topList"
          :key="index"
          :index="item.id.toString()"
        >
          <el-image
            :src="item.coverImgUrl"
            style="width: 50px; padding: 0 10px"
            :lazy="true"
          ></el-image>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content_detail"><leader-list :id="initId" /></div>
  </div>
</template>





<script>
import { topList } from "@/api/index.js";
import LeaderList from "./LeaderList";

export default {
  components: {
    LeaderList,
  },

  data() {
    return {
      topList: [],
      NewId: "",
    };
  },
  // mounted() {
  //   var ID = this.$route.query.id;
  //   if (ID) {
  //     console.log(ID);
  //     this.getPlaylistDetail(ID);
  //   }
  //   console.log(this.$route);
  // },
  computed: {
    initId() {
      if (this.NewId == "") {
        return this.topList.length != 0 && this.topList[0].id;
      } else {
        return this.NewId;
      }
    },
    initMenu() {
      var ID = this.$route.query.id;
      if (ID) {
        return ID;
      }
      if (this.topList.length != 0) {
        return this.topList[0].id.toString();
      }
    },
  },
  mounted() {
    this.getTopList();
  },
  methods: {
    async getTopList() {
      var res = await topList();
      this.topList = res.list;
      var ID = this.$route.query.id;
      if (ID) {
        this.NewId = ID;
      }
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: "/Leaderboard", query: { id: key } });
      this.NewId = key;
    },
  },
};
</script>
<style lang="scss" scoped>
.content1 {
  width: 70vw;
  margin: 0 auto;
  padding: 0 10px 0 0;
  background-color: #fff;
  display: flex;
  .content_menu {
    margin: 10px;

    flex: 1;
    text-align: left;
    .el-image {
      border-radius: 5px;
    }
  }
  .content_detail {
    // padding-right: 100px;
    margin: 10px;
    flex: 4;
  }
}
</style>