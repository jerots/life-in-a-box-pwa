<template>
  <div class="main-container" ref="mainContainer">
    <f7-progressbar v-if="loading" infinite></f7-progressbar>
    <f7-icon
      class="year-box"
      v-for="filled in (currAge - 1)"
      :tooltip="filled + ' years old'"
      :key="'filled-' + filled"
      :size="size"
      f7="app_fill"
    ></f7-icon>
    <f7-icon class="year-box current-year" :tooltip="currAge + ' years old'" :size="size" f7="app"></f7-icon>
    <f7-icon
      class="year-box"
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
  data() {
    return {
      loading: false
    };
  },
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
      this.loading = true;
      await this.debouncedResize();
    },
    debouncedResize: debounce(async function() {
      this.loading = true;
      this.setSize(200);
      while (await this.isOverflowing()) {
        this.setSize(this.size - 1);
        this.$forceUpdate();
      }
      this.loading = false;
    }, 2000)
  },
  updated() {
    if (this.sizeShouldUpdate) {
      this.resize();
    }
  },
  mounted() {
    this.resize();
    window.onresize = this.resize;
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

.year-box {
  cursor: default;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                      supported by Chrome, Opera and Firefox */
}

.current-year {
  color: lightgreen;
}
</style>