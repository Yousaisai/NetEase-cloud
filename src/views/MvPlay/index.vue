<!--
 * @Descripttion: 播放
 * @Author: Mr.You
 * @Date: 2020-10-21 20:50:08
 * @LastEditTime: 2020-10-26 11:46:19
-->
<template>
  <div class="content">
    <div class="title">
      <svg-icon style="font-size: 1.2em" icon-class="MV" />
      {{ mvdata.data ? mvdata.data.name : "" }}
    </div>
    <div class="mv"><mv-play :mvurl="mvurl" /></div>
    <div class="btn">
      <div class="btn_item">
        <el-button type="primary" size="mini" plain @click="getSubMv(mvdata)">
          <svg-icon v-show="mvdata.subed" icon-class="订阅" />
          <span v-show="mvdata.subed">已订阅</span>
          <span v-show="!mvdata.subed">订阅</span>({{
            mvdata.data ? mvdata.data.subCount : ""
          }})
        </el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" size="mini" plain
          ><svg-icon icon-class="转发" /> 转发({{
            mvdata.data ? mvdata.data.shareCount : ""
          }})
        </el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" size="mini" plain>
          <svg-icon icon-class="下载" /> 下载
        </el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" size="mini" plain
          ><svg-icon icon-class="评 论" /> 评论({{
            mvdata.data ? mvdata.data.commentCount : ""
          }})</el-button
        >
      </div>
    </div>
    <div class="com">简介：{{ mvdata.data ? mvdata.data.desc : "" }}</div>
    <div class="comment">
      <comment :type="1" :commentData="JSON.stringify(commentData)"> </comment>
    </div>
  </div>
</template>

<script>
import MvPlay from "@/components/PlayVideo/index";
import { MvData, MvUrl, SubMv, MvComment } from "@/api/index";
import comment from "@/components/comment/index";

export default {
  components: { MvPlay, comment },
  data() {
    return { mvurl: "", mvdata: {}, sub: false, commentData: {} };
  },
  computed: {
    mvid() {
      return this.$route.query;
    },
  },
  mounted() {
    this.getComment(), this.getMvData();
    this.getMvUrl();
  },
  methods: {
    async getMvData() {
      var res = await MvData(this.mvid);
      console.log(res);
      this.mvdata = res;
    },
    async getMvUrl() {
      var res = await MvUrl({ id: this.mvid.mvid });
      this.mvurl = res.data.url;
    },
    async getComment() {
      var res = await MvComment({ id: this.mvid.mvid });
      this.commentData = res;
    },
    async getSubMv(val) {
      if (!val.subed) {
        var res = await SubMv({ mvid: this.mvid.mvid, t: 1 });
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
        this.$set(val, "subed", true);
        return;
      } else {
        var res = await SubMv({ mvid: this.mvid.mvid, t: 0 });
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
        this.$set(val, "subed", false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  background-color: #fff;
  width: 1080rem;
  margin: 0 auto;
  .title {
    text-align: left;
    padding: 20rem 10rem;
    font-size: 25rem;
  }

  .mv {
    margin: 0 auto;
    width: 900rem;
  }

  .btn {
    padding: 10rem 90rem;
    display: flex;
    align-items: center;
    margin: 20rem 0 0 0;
    .btn_item {
      padding: 0 20rem 0 0;
    }
  }
  .com {
    padding: 10rem 90rem;
    font-size: 15rem;
    text-align: left;
  }
  .comment {
    padding-top: 30rem;
  }
}
</style>