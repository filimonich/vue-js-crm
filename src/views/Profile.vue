<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>
    <AsyncProfileForm />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";

const AsyncProfileForm = defineAsyncComponent({
  loader: () => import("@/components/profile/ProfileForm.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
</script>
