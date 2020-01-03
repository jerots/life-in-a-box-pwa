<template>
  <div class="main-container" ref="mainContainer">
    <f7-icon
      v-for="filled in (currAge - 1)"
      :tooltip="filled + ' years old'"
      :key="'filled-' + filled"
      :size="size"
      f7="app_fill"
    ></f7-icon>
    <f7-icon :tooltip="currAge + ' years old'" :size="size" f7="app" style="color:lightgreen;"></f7-icon>
    <f7-icon
      v-for="unfilled in lifeLeft"
      :tooltip="(unfilled + currAge) + ' years old'"
      :key="'unfilled-' + unfilled"
      :size="size"
      f7="app"
    ></f7-icon>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import { debounce } from "lodash";

export default {
  computed: {
    ...mapGetters(["lifeLeft", "currAge"]),
    ...mapState(["size", "sizeShouldUpdate"])
  },
  methods: {
    ...mapMutations(["setSize"]),
    isOverflowing() {
      return this.$nextTick().then(() => {
        const element = this.$refs.mainContainer;
        if (!element) {
          return false;
        }
        return element.offsetHeight < element.scrollHeight;
      });
    },
    async resize() {
      this.$f7.dialog.preloader("Resizing...");
      await this.debouncedResize();
    },
    debouncedResize: debounce(async function() {
      this.setSize(200);
      while (await this.isOverflowing()) {
        this.setSize(this.size - 1);
        this.$forceUpdate();
        this.$f7.dialog.close();
      }
    }, 100)
  },
  mounted() {
    if (this.sizeShouldUpdate) {
      this.resize();
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: flex-start;
  justify-content: space-evenly;
  /* overflow: hidden; */
}

.life-unit {
}
</style>