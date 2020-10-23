<!--
 * @Descripttion: 播放
 * @Author: Mr.You
 * @Date: 2020-10-21 20:50:08
 * @LastEditTime: 2020-10-22 18:17:52
-->
<template>
  <div class="content">
    <div class="title">
      <svg-icon style="font-size: 1.2em" icon-class="MV" /> {{ mvdata.name }}
    </div>
    <div class="mv"><mv-play :mvurl="mvurl" /></div>
    <div class="btn">
      <div class="btn_item">
        <el-button type="primary" size="mini" plain
          ><svg-icon icon-class="订阅" /> 订阅({{ mvdata.subCount }})
        </el-button>
      </div>
      <div class="btn_item">
        <el-button type="primary" size="mini" plain
          ><svg-icon icon-class="转发" /> 转发({{ mvdata.shareCount }})
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
            mvdata.commentCount
          }})</el-button
        >
      </div>
    </div>
    <div class="com">简介：{{ mvdata.desc }}</div>
    <div class="comment">
      <comment :commentData="JSON.stringify(commentData)"> </comment>
    </div>
  </div>
</template>

<script>
import MvPlay from "@/components/PlayVideo/index";
import { MvData, MvUrl, MvComment } from "@/api/index";
import comment from "@/components/comment/index";

export default {
  components: { MvPlay, comment },
  data() {
    return { mvurl: "", mvdata: {}, commentData: {} };
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
      this.mvdata = res.data;
    },
    async getMvUrl() {
      var res = await MvUrl({ id: this.mvid.mvid });
      this.mvurl = res.data.url;
    },
    async getComment() {
      var res = await MvComment({ id: this.mvid.mvid });
      this.commentData = res;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  background-color: #fff;
  width: 1080px;
  margin: 0 auto;
  .title {
    text-align: left;
    padding: 20px 10px;
    font-size: 25px;
  }

  .mv {
    margin: 0 auto;
    width: 900px;
  }

  .btn {
    padding: 10px 90px;
    display: flex;
    align-items: center;
    margin: 20px 0 0 0;
    .btn_item {
      padding: 0 20px 0 0;
    }
  }
  .com {
    padding: 10px 90px;
    font-size: 15px;
    text-align: left;
  }
  .comment {
    padding-top: 30px;
  }
}
</style>