import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Fragment from "vue-fragment";

import { createStore } from "./store";
import { routes } from "./view";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Fragment.Plugin);

new Vue({
  store: createStore(),
  render: h => h("router-view"),
  router: new VueRouter({
    mode: "history",
    routes
  })
}).$mount("#vue-root");
