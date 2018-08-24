<template>
  <div :class="className">
    <div class="contents">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Card",
  props: {
    clss: String,
  },
  computed: {
    className(): string {
      return this.clss ? `card ${this.clss}` : "card";
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  transition: box-shadow 0.2s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  .contents {
    padding: 20px;
  }
}
</style>
