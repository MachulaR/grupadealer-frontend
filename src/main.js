import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import axios from "axios";
import VueFormGenerator from "vue-form-generator";
import VueNotification from "@kugatsu/vuenotification";

Vue.config.productionTip = false;
Vue.use(Vuex)
Vue.use(VueFormGenerator);
Vue.use(VueNotification);

const store = new Vuex.Store({
  state: {
    url: "http://127.0.0.1:8000",
    users: []
  },
  mutations: {
    getUsers() {
      axios.get(store.state.url + "/users/all").then(response => {
        this.state.users = response.data;
      });
    }
  },
  actions: {
    getUsers() {
      store.commit("getUsers");
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
