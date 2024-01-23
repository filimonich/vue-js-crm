import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      authError: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
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
    authError: s => s.authError,
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const token = await userCredential.user.getIdToken();
        Cookies.set("auth-token", token, {
          expires: 7,
          secure: true,
        });
        dispatch("setUserAndClearError", userCredential.user);
      } catch (e) {
        commit("setAuthError", e.code);
        throw e;
      }
    },
    async logout({ dispatch, commit }) {
      try {
        const auth = getAuth();
        await signOut(auth);
        Cookies.remove("auth-token");
        dispatch("clearUserAndClearError");
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
    clearUserAndClearError({ commit }) {
      commit("clearUser");
      commit("clearAuthError");
    },
  },
};