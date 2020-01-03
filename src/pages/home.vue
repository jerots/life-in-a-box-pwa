<template>
  <f7-page name="home" ptr ptr-mousewheel ptr-bottom @ptr:refresh="resize">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-title sliding>Life in a box</f7-nav-title>
      <f7-nav-right>
        <f7-link
          icon-ios="f7:gear_alt"
          icon-aurora="f7:gear_alt"
          icon-md="f7:gear_alt"
          href="settings"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <main-display ref="mainDisplay"></main-display>
  </f7-page>
</template>
<script>
import MainDisplay from "../components/main-display";
export default {
  components: {
    MainDisplay
  },
  methods: {
    async resize(done) {
      await this.$refs.mainDisplay.resize();
      done();
    }
  }
};
</script>