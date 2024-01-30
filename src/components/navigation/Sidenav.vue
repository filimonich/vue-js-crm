<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li
      v-for="item in navigationItems"
      :key="item.path"
      :class="{ active: $route.path === item.path }"
    >
      <a
        class="waves-effect waves-orange pointer"
        @click="navigateTo(item.path)"
        >{{ item.label }}</a
      >
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const props = defineProps(["isOpen"]);

const navigationItems = [
  { label: "Счёт", path: "/" },
  { label: "История", path: "/history" },
  { label: "Планирование", path: "/planning" },
  { label: "Новая запись", path: "/record" },
  { label: "Категории", path: "/categories" },
];

function navigateTo(route) {
  router.push(route);
}
</script>
