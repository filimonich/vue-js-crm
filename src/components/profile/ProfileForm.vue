<template>
  <form class="form" @submit.prevent="updateName">
    <div class="input-field">
      <input id="description" type="text" v-model.trim="profileName" />
      <label for="description" :class="{ active: profileName !== '' }">{{
        $t("userProfile.profileName")
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
        <span>{{ $t("locale.ru") }}</span>
        <input type="checkbox" v-model="switchPosition" />
        <span class="lever"></span>
        <span>{{ $t("locale.en") }}</span>
      </label>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      @click="logSwitchValue"
    >
      {{ t("other.update") }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { getNameValidationRules } from "@/validation/validationRules";
import messages from "@/plugins/messages";
import { useI18n } from "vue-i18n";
import Tr from "@/i18n/translation";

const { t, locale } = useI18n();
const switchPosition = Tr.guessDefaultLocale() === "ru" ? false : true;
const originalSwitchPosition = ref(switchPosition);
const profileName = ref("");
const store = useStore();
const { proxy } = getCurrentInstance();
const auth = computed(() => store.state.auth);

const toggleLocale = () => {
  const newLocale = locale.value === "ru" ? "en" : "ru";
  Tr.switchLanguage(newLocale);
  localStorage.setItem("user-locale", newLocale);
};

onMounted(() => {
  const userLocale = localStorage.getItem("user-locale");
  if (!userLocale) {
    toggleLocale();
  } else {
    Tr.switchLanguage(userLocale);
  }
  M.FormSelect.init(document.querySelectorAll("select"));
});

watchEffect(() => {
  profileName.value = auth.value?.name || "Loading...";
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
    if (originalSwitchPosition.value !== switchValue) {
      toggleLocale();
      originalSwitchPosition.value = switchValue;
    }
    proxy.$showToast(messages.updateName);
  } catch (e) {}
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
