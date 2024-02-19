<template>
  <form class="form" @submit.prevent="updateName">
    <div class="input-field">
      <input id="description" type="text" v-model.trim="profileName" />
      <label for="description" :class="{ active: profileName !== '' }">{{
        t("userProfile.profileName")
      }}</label>
      <span
        v-for="(error, errorType) in v$.name.$errors"
        :key="errorType"
        class="helper-text invalid"
        >{{ error.$message }}</span
      >
    </div>

    <div class="switch">
      <label>
        <span>РУССКИЙ</span>
        <input type="checkbox" :checked="isEnglishSelected" />
        <span class="lever"></span>
        <span>ENGLISH</span>
      </label>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      @click="logSwitchValue"
    >
      {{ t("userProfile.update") }}
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
import { useI18n } from "vue-i18n";
import Tr from "@/i18n/translation";

const { t, locale } = useI18n();
const isEnglishSelected = computed(() => locale.value === "en");

console.log("newLocale", locale.value);
const toggleLocale = () => {
  const newLocale = locale.value === "ru" ? "en" : "ru";
  Tr.switchLanguage(newLocale);
};

let supportedLocales;
(async () => {
  supportedLocales = await Tr.getSupportedLocales();
  console.log("supportedLocales", supportedLocales);
})();

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
    return;
  }

  const switchValue = document.querySelector('input[type="checkbox"]').checked;
  console.log("Switch value:", switchValue);

  try {
    await store.dispatch("auth/updateUserName", profileName.value);
    toggleLocale();
    proxy.$showToast(messages.updateName);
  } catch (e) {}
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
