import Vue from "vue";
import VueTouch from 'vue-touch';
import App from "./App.vue";
import 'highlight.js/styles/railscasts.css';

Vue.config.productionTip = false;

Vue.use(VueTouch, { name: 'VueTouch' });

new Vue({
  render: h => h(App)
}).$mount("#app");