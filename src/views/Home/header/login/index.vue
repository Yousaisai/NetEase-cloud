<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-23 09:29:55
 * @LastEditTime: 2020-10-23 20:01:16
-->
<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm"
    >
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" clearable  autocomplete="off">
          <template slot="prepend">手 机</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" clearable v-model="ruleForm.password" autocomplete="off"
          ><template slot="prepend">密 码</template></el-input
        >
      </el-form-item>
      <el-form-item>
        <el-button
          @click="login"
          type="primary"
          style="width: 100%; margin-top: 30px"
          size="default"
          >登 <span style="padding: 0 10px"></span> 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Login } from "@/api/index";
import { setToken, setCookie } from "@/utils/cookie.js";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var teltest = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!teltest.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        password: "17775206686ys",
        phone: "17775206686",
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },

  methods: {
    async login() {
      try {
        var res = await Login(this.ruleForm);
      } catch (error) {
        this.$message({
          type: "warning",
          message: "账号或密码错误",
        });
        return;
      }
      if (res.code != 200) {
        this.$message({
          type: "warning",
          message: "账号或密码错误",
        });
        return;
      }
      if (this.$route.path == "/MyMuisc") {
        this.$router.push({ path: "/MyCreateList" });
      }
      setToken(res.cookie);
      setCookie("auth", true);
      this.$store.state.isLogin = true;
      this.$emit("logout");
      setCookie("account", JSON.stringify(res.account));

      setCookie("profile", JSON.stringify(res.profile));
    },
  },
};
</script>
