<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false">
      <f7-nav-title sliding>Life in a box</f7-nav-title>
      <f7-nav-right>
        <f7-link
          icon-ios="f7:gear_alt"
          icon-aurora="f7:gear_alt"
          icon-md="material:gear_alt"
          href="settings"
        ></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <main-display></main-display>
  </f7-page>
</template>
<script>
import MainDisplay from "../components/main-display";
export default {
  components: {
    MainDisplay
  }
};
</script>