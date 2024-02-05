<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <AsyncEditRecord />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";

const AsyncEditRecord = defineAsyncComponent({
  loader: () => import("@/components/record/RecordForm"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
</script>
