<template>
  <form class="form" @submit.prevent="newRecord">
    <div class="input-field">
      <select v-model="selectedCategory" ref="selectRef">
        <option value="" disabled selected>Выберите свой вариант</option>
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

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="income"
          v-model="selectedType"
        />
        <span>Доход</span>
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
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input id="amount" type="number" v-model.number="limit" />
      <label :class="{ active: limit !== '' }" for="amount">Сумма</label>
      <span
        v-for="(error, errorType) in v$.limit.$errors"
        :key="errorType"
        class="helper-text invalid"
        >{{ error.$message }}</span
      >
    </div>

    <div class="input-field">
      <input id="description" type="text" v-model.trim="recordName" />
      <label :class="{ active: recordName !== '' }" for="description"
        >Описание</label
      >
      <span
        v-for="(error, errorType) in v$.name.$errors"
        :key="errorType"
        class="helper-text invalid"
        >{{ error.$message }}</span
      >
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onMounted, onUpdated } from "vue";
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