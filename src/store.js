import Vue from "vue";
import Vuex from "vuex";

import { els } from "./assets/els";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    els,
  }
});
