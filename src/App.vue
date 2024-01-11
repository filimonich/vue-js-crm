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
const route = useRoute();
const layout = ref(null);

onMounted(() => {
  layout.value = getLayout();
});

function getLayout() {
  return route.meta.layout === "main" ? MainLayout : EmptyLayout;
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
