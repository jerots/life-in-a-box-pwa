<template>
  <f7-page name="settings">
    <f7-navbar title="Settings" back-link="Back"></f7-navbar>
    <f7-block-title>Birth date</f7-block-title>
    <f7-list>
      <f7-list-input type="datepicker" :value="[birthDate]" @calendar:change="setBirthDate"></f7-list-input>
    </f7-list>
    <f7-block-title class="display-flex justify-content-space-between">
      Life expectancy
      <span>{{lifeExpectancy}} years old</span>
    </f7-block-title>
    <f7-list>
      <f7-list-input :input="false">
        <f7-range
          @range:change="setLifeExpectancy"
          slot="input"
          :value="lifeExpectancy"
          :min="currAge"
          :max="120"
          :step="1"
        ></f7-range>
      </f7-list-input>
    </f7-list>
  </f7-page>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["birthDate", "currAge"]),
    ...mapState(["lifeExpectancy"])
  },
  methods: {
    ...mapMutations(["setLifeExpectancy", "setBirthDate"])
  },
  mounted() {
    const app = this.$f7;
  }
};
</script>
