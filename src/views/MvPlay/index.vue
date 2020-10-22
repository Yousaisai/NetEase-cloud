<!--
 * @Descripttion: 播放
 * @Author: Mr.You
 * @Date: 2020-10-21 20:50:08
 * @LastEditTime: 2020-10-22 10:05:45
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
    <div class="comment"></div>
  </div>
</template>

<script>
import MvPlay from "@/components/PlayVideo/index";
import { MvData, MvUrl } from "@/api/index";
export default {
  components: { MvPlay },
  data() {
    return { mvurl: "", mvdata: {} };
  },
  computed: {
    mvid() {
      return this.$route.query;
    },
  },
  mounted() {
    this.getMvData();
    this.getMvUrl();
  },
  methods: {
    async getMvData() {
      var res = await MvData(this.mvid);
      console.log(res.data);
      this.mvdata = res.data;
    },
    async getMvUrl() {
      var res = await MvUrl({ id: this.mvid.mvid });
      console.log(res.data.url);
      this.mvurl = res.data.url;
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
  }
}
</style>