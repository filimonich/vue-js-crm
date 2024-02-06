import { getDatabase, ref, set, get } from "firebase/database";

export async function createCategory(
  { state, commit },
  { categoryName, limit }
) {
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
    commit("setAuthError", e);
    throw e;
  }
}
