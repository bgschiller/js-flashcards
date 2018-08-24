<template>
  <div id="app">
    <h1>JS Flashcards</h1>
    <CardList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CardList from "./components/CardList.vue";

export default Vue.extend({
  name: "app",
  components: { CardList },
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
