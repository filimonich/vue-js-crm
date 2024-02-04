import { getDatabase, ref, set, get } from "firebase/database";

export async function updateCategory(
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

    const categoriesRef = ref(database, `users/${state.user.uid}/categories`);
    const snapshot = await get(categoriesRef);
    let categories = snapshot.exists() ? snapshot.val() : [];
    if (!Array.isArray(categories)) {
      categories = Object.values(categories);
    }
    commit("setCategories", categories);
  } catch (e) {
    console.error("Ошибка при обновлении категории", e);
  }
}
