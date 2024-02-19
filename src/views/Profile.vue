<template>
  <div>
    <div class="page-title">
      <h3>{{ tabTitle }}</h3>
    </div>
    <AsyncProfileForm />
  </div>
</template>

<script setup>
import { defineAsyncComponent, computed, watchEffect } from "vue";
import Loader from "@/components/loader/Loader.vue";
import { setTitle } from "@/utils/title.utils";
import { useI18n } from "vue-i18n";

const AsyncProfileForm = defineAsyncComponent({
  loader: () => import("@/components/profile/ProfileForm.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});

const { t } = useI18n();
const tabTitle = computed(() => t("userProfile.profileTitle"));

watchEffect(() => setTitle(tabTitle.value));
</script>
