<template>
  <div class="main-container">
    <f7-icon
      v-for="filled in currAge"
      :tooltip="String(filled)"
      :key="'filled-' + filled"
      f7="app_fill"
    ></f7-icon>
    <f7-icon
      v-for="unfilled in lifeLeft"
      :tooltip="String(unfilled + currAge)"
      :key="'unfilled-' + unfilled"
      f7="app"
    ></f7-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currAge: 28,
      lifeExpectancy: 80
    };
  },
  computed: {
    lifeLeft() {
      return this.lifeExpectancy - this.currAge;
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
}

.life-unit {
}
</style>