import Vue from "vue";
import Vuex from "vuex";

import { createStore } from "./store";

Vue.use(Vuex);

new Vue({
  store: createStore(),
}).$mount("#vue-root");
