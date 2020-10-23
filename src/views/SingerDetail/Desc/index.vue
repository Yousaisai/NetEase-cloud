<!--
 * @Descripttion: 歌手简介
 * @Author: Mr.You
 * @Date: 2020-10-18 16:29:28
 * @LastEditTime: 2020-10-22 18:18:54
-->
<template>
  <div class="content">
    <div class="briefdesc">
      <h4>歌手简介</h4>
      <li>{{ briefDesc }}</li>
    </div>
    <div class="introduction">
      <div class="item" v-for="(item, index) in introduction" :key="index">
        <div class="item_title">
          <h4>{{ item.ti }}</h4>
        </div>
        <div class="item_content">
          <li v-for="(txtitem, index) in item.txt" :key="index">
            {{ txtitem.replace("▪", " ▪") }}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SingersDesc } from "@/api/index";
export default {
  props: ["id"],
  data() {
    return {
      briefDesc: {},
      introduction: [],
    };
  },
  mounted() {
    this.getSingersDesc();
  },
  methods: {
    async getSingersDesc() {
      var res = await SingersDesc(this.id);
      this.briefDesc = res.briefDesc;
      res.introduction.map((val) => {
        val.txt = val.txt.split("\n");
      });
      this.introduction = res.introduction;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  text-align: left;

  li {
    list-style: none;
    padding: 10px;
    font-size: 13px;
    color: #666;
    text-indent: 2em;line-height:25px
  }
}
</style>