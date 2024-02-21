<template>
  <div class="app-main-layout">
    <Navbar @toggleSidenav="toggleSidenav" />
    <Sidenav :isOpen="isSidenavOpen" />
    <main :class="contentClass">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record"
        v-tooltip="tooltipText"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";
import Navbar from "@/components/navigation/Navbar";
import Sidenav from "@/components/navigation/Sidenav";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tooltipText = ref(t("other.createNewRecord"));
const isSidenavOpen = ref(true);
const isFullContent = ref(false);
const contentClass = ref("app-content");
const someDynamicValue = ref("");

watchEffect(() => {
  tooltipText.value = someDynamicValue.value
    ? someDynamicValue.value
    : t("other.createNewRecord");
});

const toggleSidenav = () => {
  isSidenavOpen.value = !isSidenavOpen.value;
  isFullContent.value = !isFullContent.value;
};

watch(isFullContent, newValue => {
  contentClass.value = newValue ? "app-content full" : "app-content";
});
</script>
