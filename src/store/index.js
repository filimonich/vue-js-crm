import { createStore } from "vuex";
import auth from "./modules/auth";
import userProfile from "./modules/userProfile";

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
    userProfile,
  },
});
