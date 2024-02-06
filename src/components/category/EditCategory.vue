<template>
  <div class="col s12 m6" v-if="selectedCategory">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="updateCategory">
        <div class="input-field">
          <select v-model="selectedCategory">
            <option
              v-for="category in categories"
              :key="category.name"
              :value="category"
            >
              {{ category.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" v-model.trim="editableCategory.name" />
          <label :class="{ active: editableCategory.name !== '' }" for="name"
            >Название</label
          >
          <span
            v-for="(error, errorType) in v$.name.$errors"
            :key="errorType"
            class="helper-text invalid"
            >{{ error.$message }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="editableCategory.limit"
          />
          <label :class="{ active: editableCategory.limit !== '' }" for="limit"
            >Лимит</label
          >
          <span
            v-for="(error, errorType) in v$.limit.$errors"
            :key="errorType"
            class="helper-text invalid"
            >{{ error.$message }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import {
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  onUpdated,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import {
  getLimitValidationRules,
  getNameValidationRules,
} from "@/validation/validationRules";
import messages from "@/plugins/messages";

const store = useStore();
const categories = computed(() => store.state.auth.categories);
const selectedCategory = ref(null);
const editableCategory = ref({});
const { proxy } = getCurrentInstance();

watch(selectedCategory, newCategory => {
  if (newCategory) {
    editableCategory.value = { ...newCategory };
  }
});

watch(
  categories,
  newCategories => {
    if (newCategories && newCategories.length > 0) {
      selectedCategory.value = newCategories[0];
    } else {
      selectedCategory.value = null;
    }
  },
  { immediate: true }
);

onMounted(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

onUpdated(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

const updateCategory = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }
  const categoryId = editableCategory.value;
  const categoryName = editableCategory.value.name;
  const limit = editableCategory.value.limit;

  const nameExists = categories.value.some(
    category => category.name === categoryName
  );

  if (nameExists) {
    proxy.$showToast(messages.existsCategory);
    return;
  }

  const categoryIndex = categories.value.findIndex(
    category => category.name === selectedCategory.value.name
  );

  console.log("categoryIndex", categoryIndex);
  console.log("categoryId:", categoryId);
  console.log("categoryName:", categoryName);
  console.log("limit:", limit);
  console.log("store.categories", store.state.auth.categories);

  try {
    await store.dispatch("auth/updateCategory", {
      categoryIndex: categoryIndex,
      categoryName: categoryName,
      limit: limit,
    });

    proxy.$showToast(messages.updateCategory);
  } catch (e) {}
};

const rules = {
  name: { ...getNameValidationRules() },
  limit: { ...getLimitValidationRules() },
};

const v$ = useVuelidate(rules, editableCategory);
</script>
