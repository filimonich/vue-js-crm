import { getDatabase, ref, set, get } from "firebase/database";

export async function createNewRecord(
  { state, commit },
  { categoryIndex, recordName, limit, selectedType }
) {
  const database = getDatabase();
  const categoriesRef = ref(database, `users/${state.user.uid}/categories`);
  try {
    const snapshot = await get(categoriesRef);
    let categories = snapshot.exists() ? snapshot.val() : [];
    if (!Array.isArray(categories[categoryIndex].records)) {
      categories[categoryIndex].records = [];
    }
    categories[categoryIndex].records.push({
      name: recordName,
      limit: limit,
      selectedType: selectedType,
      createdDate: new Date().toLocaleString(),
    });

    if (selectedType === "income") {
      categories[categoryIndex].limit += limit;
    } else if (selectedType === "outcome") {
      categories[categoryIndex].limit -= limit;
    }

    await set(categoriesRef, categories);
    commit("setCategories", categories);
  } catch (e) {
    commit("setCategoriesError", e);
    throw e;
  }
}
