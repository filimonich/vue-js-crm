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
          <input type="text" id="name" v-model="editableCategory.name" />
          <label :class="{ active: editableCategory.name }" for="name"
            >Название</label
          >
          <span
            v-for="(error, errorType) in v$.selectedCategory.name.$errors"
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
          <label :class="{ active: editableCategory.limit }" for="limit"
            >Лимит</label
          >
          <span
            v-for="(error, errorType) in v$.selectedCategory.limit.$errors"
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
const categoryName = ref("");
const limit = ref(100);
const categories = computed(() => store.state.auth.categories);
const selectedCategory = ref(null);
const editableCategory = ref({});
const { proxy } = getCurrentInstance();

const rules = {
  selectedCategory: {
    name: getNameValidationRules(),
    limit: getLimitValidationRules(),
  },
};

const v$ = useVuelidate(rules, { selectedCategory });

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
    console.log("Form submitted:", selectedCategory.value.name, limit.value);
    return;
  }
  if (selectedCategory.value) {
    try {
      const categoryId = categories.value.findIndex(
        category => category.id === editableCategory.value.id
      );

      await store.dispatch("auth/updateCategory", {
        categoryId: categoryId,
        categoryName: editableCategory.value.name,
        limit: editableCategory.value.limit,
      });
      Object.assign(selectedCategory.value, editableCategory.value);
      proxy.$showToast(messages.updateCategory);
    } catch (e) {}
  }
};
</script>
