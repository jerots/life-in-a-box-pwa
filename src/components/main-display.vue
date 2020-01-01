<template>
  <div v-if="show" class="main-container" ref="mainContainer">
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
export default {
  data() {
    return {
      currAge: 28,
      lifeExpectancy: 80,
      size: 200,
      show: true
    };
  },
  computed: {
    lifeLeft() {
      return this.lifeExpectancy - this.currAge;
    }
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
      while (await this.isOverflowing()) {
        this.show = false;
        this.size -= 5;
        this.show = true;
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