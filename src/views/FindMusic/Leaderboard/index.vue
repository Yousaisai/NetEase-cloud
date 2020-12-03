<!--
 * @Descripttion: 排行榜导航栏
 * @Author: Mr.You
 * @Date: 2020-10-12 16:07:04
 * @LastEditTime: 2020-12-03 11:37:54
-->
<template>
  <div class="content1">
    <div class="content_menu">
      <h5 style="padding-left: 12rem;font-size:15rem">网易云音乐榜</h5>
      <el-menu :default-active="initMenu" @select="handleSelect">
        <el-menu-item
          v-for="(item, index) in topList"
          :key="index"
          :index="item.id.toString()"
        >
          <el-image
            :src="item.coverImgUrl"
            style="width: 50rem; padding: 0 10rem"
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
  width: 70vw;
  margin: 0 auto;
  padding: 0 10rem 0 0;
  background-color: #fff;
  display: flex;
  .content_menu {
    margin: 10rem;
    flex: 1;
    text-align: left;
    .el-image {
      border-radius: 5rem;
    }
  }
  .content_detail {
    // padding-right: 100rem;
    margin: 10rem;
    flex: 4;
  }
}
</style>