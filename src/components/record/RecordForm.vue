<template>
  <template v-if="isCategoriesEmpty">
    <div class="center">
      <div class="margin">
        <p class="card-title">{{ $t("record.noCategories") }}</p>
      </div>
      <div>
        <router-link to="/categories">
          <a class="btn waves-effect waves-light">{{
            $t("record.newCategory")
          }}</a>
        </router-link>
      </div>
    </div>
  </template>
  <template v-else>
    <form class="form" @submit.prevent="newRecord">
      <div class="input-field">
        <select v-model="selectedCategory" ref="selectRef">
          <option value="" disabled selected>
            {{ $t("record.yourOption") }}
          </option>
          <option
            v-for="category in categories"
            :key="category.name"
            :value="category"
          >
            {{ category.name }}
          </option>
        </select>
        <label>{{ $t("record.selectCategory") }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="selectedType"
          />
          <span>{{ $t("record.income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="selectedType"
          />
          <span>{{ $t("record.outcome") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="limit" />
        <label :class="{ active: limit !== '' }" for="amount">
          {{ $t("record.amount") }}
        </label>
        <span
          v-for="(error, errorType) in v$.limit.$errors"
          :key="errorType"
          class="helper-text invalid"
          >{{ error.$message }}</span
        >
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model.trim="recordName" />
        <label :class="{ active: recordName !== '' }" for="description">{{
          $t("record.description")
        }}</label>
        <span
          v-for="(error, errorType) in v$.name.$errors"
          :key="errorType"
          class="helper-text invalid"
          >{{ error.$message }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $t("record.create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </template>
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

const recordName = ref("");
const limit = ref(100);
const store = useStore();
const categories = computed(() => store.state.auth.categories);
const selectedCategory = ref(null);
const selectedType = ref(null);
const { proxy } = getCurrentInstance();

const isCategoriesEmpty = computed(() => {
  const categories = store.state.auth.categories;
  return !Array.isArray(categories) || categories.length === 0;
});

watch(
  () => store.state.auth.authError,
  newError => {
    try {
      proxy.$handleError(messages[newError]);
      store.commit("auth/clearAuthError");
    } catch (e) {}
  }
);

const rules = {
  name: getNameValidationRules(),
  limit: getLimitValidationRules(),
};

const v$ = useVuelidate(rules, {
  name: recordName,
  limit: limit,
});

onMounted(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

onUpdated(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

const newRecord = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  if (!selectedCategory.value || !selectedType.value) {
    proxy.$showToast(messages.selectedCategoryAndRadio);
    return;
  }

  const categoryIndex = categories.value.findIndex(
    category => category.name === selectedCategory.value.name
  );

  const auth = store.state.auth;
  const authCategories = auth.categories;
  const currentSelectedCategory = authCategories[categoryIndex];
  console.log("currentSelectedCategory", currentSelectedCategory);

  if (selectedType.value === "income") {
    if (auth.bill <= limit.value) {
      proxy.$showToast(messages.notEnoughMoney);
      return;
    }
    if (currentSelectedCategory.limit <= currentSelectedCategory.amount) {
      console.log("сумма в категории набрана");
      proxy.$showToast(messages.limitAmountCollected);
      return;
    }
    if (
      limit.value >
      currentSelectedCategory.limit - currentSelectedCategory.amount
    ) {
      proxy.$showToast(messages.amountMoreThanRequired);
      return;
    }
  }

  if (selectedType.value === "outcome") {
    if (currentSelectedCategory.amount < limit.value) {
      proxy.$showToast(messages.insufficientFunds);
      return;
    }
  }

  try {
    await store.dispatch("auth/createNewRecord", {
      categoryIndex: categoryIndex,
      recordName: recordName.value,
      limit: limit.value,
      selectedType: selectedType.value,
    });
    proxy.$showToast(messages.recordCategory);
  } catch (e) {}
};
</script>
