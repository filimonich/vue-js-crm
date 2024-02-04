import { userData } from "@/store/actions/userData";
import { updateCategory } from "@/store/actions/updateCategory";
import { login, register, logout } from "@/store/actions/authLogic";
import { createCategory } from "@/store/actions/createCategory";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      name: null,
      bill: null,
      categories: null,
      authError: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      Object.assign(state, payload);
    },
    clearUser(state) {
      Object.assign(state, {
        user: null,
        name: null,
        bill: null,
        categories: null,
      });
    },
    setAuthError(state, error) {
      state.authError = error;
    },
    clearAuthError(state) {
      state.authError = null;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  getters: {
    user: s => s.user,
    name: s => s.name,
    bill: s => s.bill,
    categories: s => s.categories,
    authError: s => s.authError,
  },
  actions: {
    async login({ commit }, { email, password }) {
      await login({ commit }, { email, password });
    },
    async register({ commit }, { email, password, name }) {
      await register({ commit }, { email, password, name });
    },
    async userData({ commit }) {
      await userData(commit);
    },
    async createCategory({ state, commit }, { categoryName, limit }) {
      await createCategory({ state, commit }, { categoryName, limit });
    },
    async updateCategory(
      { state, commit },
      { categoryIndex, categoryName, limit }
    ) {
      await updateCategory(
        { state, commit },
        { categoryIndex, categoryName, limit }
      );
    },
    async logout({ commit }) {
      await logout({ commit });
    },
  },
};
