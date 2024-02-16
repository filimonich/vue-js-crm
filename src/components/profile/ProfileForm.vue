<template>
  <form class="form" @submit.prevent="updateName">
    <div class="input-field">
      <input id="description" type="text" v-model.trim="profileName" />
      <label for="description" :class="{ active: profileName !== '' }"
        >Имя</label
      >
      <span
        v-for="(error, errorType) in v$.name.$errors"
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
</template>

<script setup>
import {
  getCurrentInstance,
  ref,
  computed,
  onMounted,
  onUpdated,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { getNameValidationRules } from "@/validation/validationRules";
import messages from "@/plugins/messages";

const profileName = ref("");
const store = useStore();
const { proxy } = getCurrentInstance();
const auth = computed(() => store.state.auth);

watchEffect(() => {
  profileName.value = auth.value?.name || "Loading...";
});

onMounted(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

onUpdated(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

const rules = {
  name: getNameValidationRules(),
};

const v$ = useVuelidate(rules, {
  name: profileName,
});

const updateName = async () => {
  if (v$.value.$invalid) {
    v$.value.$touch();
    console.log(profileName.value);
    return;
  }
};
</script>
