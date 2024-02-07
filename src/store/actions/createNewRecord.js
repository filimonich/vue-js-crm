import { getDatabase, ref, set, get } from "firebase/database";

export async function createNewRecord(
  { state, commit },
  { categoryIndex, recordName, limit, selectedType }
) {
  const database = getDatabase();
  const categoriesRef = ref(database, `users/${state.user.uid}/categories`);
  const billRef = ref(database, `users/${state.user.uid}/bill`);
  try {
    const categoriesSnapshot = await get(categoriesRef);
    const billSnapshot = await get(billRef);
    let categories = categoriesSnapshot.exists()
      ? categoriesSnapshot.val()
      : [];
    let bill = billSnapshot.exists() ? billSnapshot.val() : 0;
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
      categories[categoryIndex].amount += limit;
      bill -= limit;
    } else if (selectedType === "outcome") {
      categories[categoryIndex].amount -= limit;
      bill += limit;
    }

    await set(categoriesRef, categories);
    await set(billRef, bill);

    commit("setCategories", categories);
    commit("setUser", { bill });
  } catch (e) {
    commit("setAuthError", e);
    throw e;
  }
}
