<template>
  <div class="main-container" ref="mainContainer">
    <f7-icon
      v-for="filled in (currAge - 1)"
      :tooltip="String(filled)"
      :key="'filled-' + filled"
      :size="size"
      f7="app_fill"
    ></f7-icon>
    <f7-icon :tooltip="String(currAge)" :size="size" f7="app" style="color:lightgreen;"></f7-icon>
    <f7-icon
      v-for="unfilled in lifeLeft"
      :tooltip="String(unfilled + currAge)"
      :key="'unfilled-' + unfilled"
      :size="size"
      f7="app"
    ></f7-icon>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      size: 200
    };
  },
  computed: {
    ...mapGetters(["lifeLeft", "currAge"])
  },
  methods: {
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
      this.size = 200;
      while (await this.isOverflowing()) {
        this.size -= 5;
        this.$forceUpdate();
      }
    }
  },
  mounted() {
    this.resize();
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: flex-start;
  /* overflow: hidden; */
}

.life-unit {
}
</style>