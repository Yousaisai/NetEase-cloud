<template>
  <el-row type="flex" align="center">
    <el-col :span="4">
      <el-row>
        <el-col :span="8">
          <svg-icon
            icon-class="网易云"
            style="font-size: 3.5em; padding: 10px 0; line-height: 60px"
        /></el-col>
        <el-col :span="16">
          <h3 style="color: #f3f3f3; padding: 10px 0; float: left">
            Mr.You' Music
          </h3>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4" style="padding: 10px 0; line-height: 60px"
      ><el-input
        v-model="search"
        suffix-icon="el-icon-search"
        placeholder="请输入歌曲名或歌手"
        size="small"
      >
      </el-input
    ></el-col>
    <el-col :span="16">
      <div
        v-if="!auth"
        style="float: right; padding: 10px 0; line-height: 60px; color: #f3f3f3"
      >
        <span>登录</span>
      </div>

      <div v-if="auth" style="float: right; padding: 10px 0; line-height: 60px">
        <svg-icon
          icon-class="网易云"
          style="font-size: 3.5em; padding: 10px 0; line-height: 60px"
        />
      </div>
    </el-col>
  </el-row>
</template>





<script>
export default {
  data() {
    return { search: "", auth: false };
  },
  methods: {},
};
</script>
