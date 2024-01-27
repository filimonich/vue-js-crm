import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export async function fetchUserData(commit) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const database = getDatabase();
    const userRef = ref(database, "users/" + user.uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const name = userData.name;
      const bill = userData.bill;
      commit("setUser", { user, name, bill });
      localStorage.setItem("auth", JSON.stringify({ user, name, bill }));
    } else {
      console.error("No data available for user: " + user.uid);
    }
  }
}
