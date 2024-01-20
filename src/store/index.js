import { createStore } from "vuex";
import auth from "./modules/auth";

export default createStore({
  state: {
    info: {},
  },
  getters: {
    error: s => s.error,
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
