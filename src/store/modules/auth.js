import { fetchUserData } from "@/store/actions/userData";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      name: null,
      categories: null,
      bill: null,
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
    categories: s => s.categories,
    bill: s => s.bill,
    authError: s => s.authError,
  },
  actions: {
    async login({ commit }, { email, password }) {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const database = getDatabase();
        const userRef = ref(database, "users/" + user.uid);

        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const name = userData.name;
          const bill = userData.bill;
          commit("setUser", { user, name, bill });
        } else {
          console.error("No data available for user: " + user.uid);
          commit("setAuthError", "No data available");
        }
        commit("clearAuthError");
      } catch (e) {
        commit("setAuthError", e.code);
        throw e;
      }
    },
    async register({ commit }, { email, password, name }) {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const database = getDatabase();
        const userRef = ref(database, "users/" + user.uid);
        await set(userRef, {
          name: name,
          bill: 100000,
        });

        commit("setUser", { user, name, bill: 100000 });
        commit("clearAuthError");
      } catch (e) {
        commit("setAuthError", e.code);
        throw e;
      }
    },
    async fetchUserData({ commit }) {
      await fetchUserData(commit);
    },
    async createCategory({ state, commit }, { categoryName, limit }) {
      const database = getDatabase();
      const categoriesRef = ref(database, `users/${state.user.uid}/categories`);
      try {
        const snapshot = await get(categoriesRef);
        let categories = snapshot.exists() ? snapshot.val() : [];
        if (!Array.isArray(categories)) {
          categories = Object.values(categories);
        }
        categories.push({
          name: categoryName,
          limit: limit,
        });
        await set(categoriesRef, categories);
        commit("setCategories", categories);
      } catch (e) {
        console.error("Ошибка при создании категории", e);
      }
    },
    async updateCategory(
      { state, commit },
      { categoryIndex, categoryName, limit }
    ) {
      const database = getDatabase();
      const categoryRef = ref(
        database,
        `users/${state.user.uid}/categories/${categoryIndex}`
      );
      try {
        await set(categoryRef, {
          name: categoryName,
          limit: limit,
        });

        const categoriesRef = ref(
          database,
          `users/${state.user.uid}/categories`
        );
        const snapshot = await get(categoriesRef);
        let categories = snapshot.exists() ? snapshot.val() : [];
        if (!Array.isArray(categories)) {
          categories = Object.values(categories);
        }
        commit("setCategories", categories);
      } catch (e) {
        console.error("Ошибка при обновлении категории", e);
      }
    },
    async logout({ commit }) {
      const auth = getAuth();
      try {
        await signOut(auth);
        localStorage.removeItem("auth");
        commit("clearUser");
        commit("clearAuthError");
      } catch (e) {
        console.error("Ошибка при выходе", e);
        commit("setAuthError", e);
        throw e;
      }
    },
  },
};
