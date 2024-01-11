<template>
  <div class="app-main-layout">
    <Navbar @toggleSidenav="toggleSidenav" />
    <Sidenav :isOpen="isSidenavOpen" />
    <main :class="contentClass">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Navbar from "@/components/navigation/Navbar";
import Sidenav from "@/components/navigation/Sidenav";

const isSidenavOpen = ref(true);
const isFullContent = ref(false);
const contentClass = ref("app-content");

const toggleSidenav = () => {
  isSidenavOpen.value = !isSidenavOpen.value;
  isFullContent.value = !isFullContent.value;
};

watch(isFullContent, newValue => {
  contentClass.value = newValue ? "app-content full" : "app-content";
});
</script>
