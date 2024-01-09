import { createStore } from "vuex";

export default createStore({
  state: {
    info: {},
  },
  getters: {
    error: s => s.error,
  },
  mutations: {},
  actions: {},
  modules: {},
});
