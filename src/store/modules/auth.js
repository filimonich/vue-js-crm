import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      isLoggedIn: false,
      authError: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = !!user;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setAuthError(state, error) {
      state.authError = error;
    },
    clearAuthError(state) {
      state.authError = null;
    },
  },
  getters: {
    user: s => s.user,
    isLoggedIn: s => s.isLoggedIn,
    authError: s => s.authError,
  },
  actions: {
    async login({ dispatch }, { email, password }) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch("setUserAndClearError", userCredential.user);
      } catch (e) {
        console.error("Ошибка при входе", e);
        commit("setAuthError", e);
        throw e;
      }
    },
    async logout({ dispatch }) {
      try {
        const auth = getAuth();
        await signOut(auth);
        dispatch("clearUserAndError");
      } catch (e) {
        console.error("Ошибка при выходе", e);
        commit("setAuthError", e);
        throw e;
      }
    },
    setUserAndClearError({ commit }, user) {
      commit("setUser", user);
      commit("clearAuthError");
    },
    clearUserAndError({ commit }) {
      commit("clearUser");
      commit("clearAuthError");
    },
  },
};
