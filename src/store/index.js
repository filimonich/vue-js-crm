import { createStore } from "vuex";
import auth from "./modules/auth";
import currency from "./modules/currency";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: s => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {
    auth,
    currency,
  },
});
