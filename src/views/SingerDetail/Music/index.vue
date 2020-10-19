<template>
  <div>
    <div class="item_table"><eltable :Songs="hotSongs" /></div>
  </div>
</template>

<script>
import eltable from "@/components/Talble";
import { SingersOne } from "@/api/index";

export default {
  components: { eltable },
  props: ["id", "hotSongs"],
  data() {
    return {};
  },
  mounted() {},
};
</script>
