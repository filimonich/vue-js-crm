<template>
  <div>
    <div class="page-title">
      <h3>{{ tabTitle }}</h3>
    </div>
    <section>
      <div class="row">
        <AsyncEditCategory />
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import Loader from "@/components/loader/Loader.vue";

const AsyncEditCategory = defineAsyncComponent({
  loader: () => import("@/components/category/CategoryForm"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});

const tabTitle = ref("Категории");
</script>
