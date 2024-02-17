<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li
      v-for="item in navigationItems"
      :key="item.path"
      :class="{ active: $route.path === item.path }"
    >
      <a class="waves-effect waves-orange pointer" @click="navigateTo(item)">{{
        item.label
      }}</a>
    </li>
  </ul>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { defineProps, watch } from "vue";
import { setTitle } from "@/utils/title.utils";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  isOpen: Boolean,
});

const navigationItems = [
  { label: "Счёт", path: "/" },
  { label: "История", path: "/history" },
  { label: "Планирование", path: "/planning" },
  { label: "Новая запись", path: "/record" },
  { label: "Категории", path: "/categories" },
];

function navigateTo(item) {
  router.push(item.path);
  setTitle(item.label);
}

watch(
  () => route.path,
  newPath => {
    const item = navigationItems.find(item => item.path === newPath);
    const title = item ? item.label : "CRM";
    setTitle(title);
  }
);
</script>
