<template>
  <div id="app">
    <div>
      <NotificationForm/>
    </div>
  </div>
</template>

<script>
import NotificationForm from "./components/NotificationForm.vue";

export default {
  name: "App",
  components: {
    NotificationForm
  },
  created() {
    this.$store.dispatch("getUsers");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
