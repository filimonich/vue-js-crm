<template>
  <component :is="getLayout()">
    <router-view />
  </component>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Tr from "@/i18n/translation";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const route = useRoute();
const layout = ref(null);

onMounted(() => {
  setHtmlLangAttribute();
});

const toggleLocale = () => {
  const newLocale = locale.value;
  Tr.switchLanguage(newLocale);
  localStorage.setItem("user-locale", newLocale);
};

onMounted(() => {
  const userLocale =
    localStorage.getItem("user-locale") || Tr.guessDefaultLocale();
  Tr.switchLanguage(userLocale);
  M.FormSelect.init(document.querySelectorAll("select"));
  toggleLocale();
});

function setHtmlLangAttribute() {
  const locale = Tr.guessDefaultLocale();
  document.querySelector("html").setAttribute("lang", locale);
}

function getLayout() {
  return route.meta.layout === "main" ? MainLayout : EmptyLayout;
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
