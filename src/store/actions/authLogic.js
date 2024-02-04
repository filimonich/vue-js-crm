import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

export async function login({ commit }, { email, password }) {
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
}

export async function register({ commit }, { email, password, name }) {
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
}

export async function logout({ commit }) {
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
}
