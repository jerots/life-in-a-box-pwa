<template>
  <f7-page name="settings">
    <f7-navbar title="Settings" back-link="Back"></f7-navbar>
    <f7-block-title>Birth date</f7-block-title>
    <f7-list>
      <f7-list-input type="date" v-model="birthDate" id="birthday-picker"></f7-list-input>
    </f7-list>
    <f7-block-title class="display-flex justify-content-space-between">
      Life expectancy
      <span>{{lifeExpectancy}} years old</span>
    </f7-block-title>
    <f7-list>
      <f7-list-input :input="false">
        <f7-range
          @range:change="updateLifeExpectancy"
          slot="input"
          :value="lifeExpectancy"
          :min="1"
          :max="120"
          :step="1"
        ></f7-range>
      </f7-list-input>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      lifeExpectancy: 80,
      birthDate: "1980-01-01"
    };
  },
  methods: {
    updateLifeExpectancy(newVal) {
      this.lifeExpectancy = newVal;
    }
  },
  mounted() {
    const app = this.$f7;
    app.calendar.create({
      inputEl: "#birthday-picker"
    });
  }
};
</script>
