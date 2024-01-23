import { getDatabase, ref, set } from "firebase/database";

const userProfile = {
  namespaced: true,
  actions: {
    async setUserProfile({ commit }, { userId, profileData }) {
      try {
        const db = getDatabase();
        await set(ref(db, "users/" + userId), profileData);
      } catch (error) {
        console.error(
          "Ошибка при установке профиля пользователя в Realtime Database:",
          error
        );
        throw error;
      }
    },
  },
};

export default userProfile;
