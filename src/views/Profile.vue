<template>
  <div>
    <div class="page-title">
      <h3>{{ tabTitle }}</h3>
    </div>
    <AsyncProfileForm />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";
import { setTitle } from "@/utils/title.utils";

const AsyncProfileForm = defineAsyncComponent({
  loader: () => import("@/components/profile/ProfileForm.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});

const tabTitle = "Профиль";
setTitle(tabTitle);
</script>
