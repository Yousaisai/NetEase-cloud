<!--
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-18 16:29:28
 * @LastEditTime: 2020-10-18 17:14:13
-->
<template>
  <div class="content">{{ id }}</div>
</template>

<script>
import { SingersDesc } from "@/api/index";
export default {
  props: ["id"],
  data() {
    return {
      SingersDescPayload: {
        id: this.id.id,
      },
    };
  },
  methods: {},
};
</script>
