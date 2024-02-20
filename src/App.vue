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

const route = useRoute();
const layout = ref(null);

onMounted(() => {
  setHtmlLangAttribute();
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
