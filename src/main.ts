import Vue from "vue";
import App from "./App.vue";
import 'highlight.js/styles/railscasts.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");