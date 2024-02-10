<template>
  <AsyncOpenInNew />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";

const AsyncOpenInNew = defineAsyncComponent({
  loader: () => import("@/components/detail/OpenInNew.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
</script>
