<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t("categories.create") }}</h4>
      </div>
      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input id="name" type="text" v-model.trim="categoryName" />
          <label for="name">{{ $t("categories.categoryName") }}</label>
          <span
            v-for="(error, errorType) in v$.name.$errors"
            :key="errorType"
            class="helper-text invalid"
            >{{ error.$message }}</span
          >
        </div>
        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" />
          <label :class="{ active: limit !== '' }" for="limit">
            {{ $t("categories.limit") }}
          </label>
          <span
            v-for="(error, errorType) in v$.limit.$errors"
            :key="errorType"
            class="helper-text invalid"
            >{{ error.$message }}</span
          >
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          {{ $t("categories.create") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
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
const { proxy } = getCurrentInstance();

const rules = {
  name: getNameValidationRules(),
  limit: getLimitValidationRules(),
};

const v$ = useVuelidate(rules, {
  name: categoryName,
  limit: limit,
});

const categoryExists = name => {
  const categories = store.state.auth.categories;
  if (!Array.isArray(categories)) {
    return false;
  }
  return categories.some(category => category.name === name);
};

const createCategory = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  if (categoryExists(categoryName.value)) {
    proxy.$showToast(messages.existsCategory);
    return;
  }

  try {
    await store.dispatch("auth/createCategory", {
      categoryName: categoryName.value,
      limit: limit.value,
    });
    proxy.$showToast(messages.createCategory);
  } catch (e) {}
};
</script>
