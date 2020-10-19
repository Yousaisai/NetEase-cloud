<template>
  <div class="content">{{ id }}</div>
</template>

<script>
import { SingersMv } from "@/api/index";
export default {
  props: ["id"],
  data() {
    return {
      SingersMvPayload: {
        id: this.id.id,
      },
    };
  },
  methods: {},
};
</script>
