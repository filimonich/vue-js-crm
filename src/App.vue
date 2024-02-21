<template>
  <component :is="getLayout()">
    <router-view />
  </component>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import Tr from "@/i18n/translation";

const route = useRoute();

onMounted(() => {
  setHtmlLangAttribute();
  initializeLocale();
});

function setHtmlLangAttribute() {
  const locale = Tr.guessDefaultLocale();
  document.querySelector("html").setAttribute("lang", locale);
}

function initializeLocale() {
  const userLocale = localStorage.getItem("user-locale");
  if (userLocale) {
    Tr.switchLanguage(userLocale);
  } else {
    toggleLocale();
  }
}

const toggleLocale = () => {
  const newLocale = Tr.getCurrentLanguage() === "ru" ? "en" : "ru";
  updateLocale(newLocale);
};

const updateLocale = newLocale => {
  Tr.switchLanguage(newLocale);
  localStorage.setItem("user-locale", newLocale);
};

const getLayout = () =>
  route.meta.layout === "main" ? MainLayout : EmptyLayout;
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
