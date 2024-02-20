<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li
      v-for="item in navigationItems"
      :key="item.path"
      :class="{ active: $route.path === item.path }"
    >
      <a class="waves-effect waves-orange pointer" @click="navigateTo(item)">
        {{ $t(item.label) }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { defineProps, ref, watchEffect } from "vue";
import { setTitle } from "@/utils/title.utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const props = defineProps({
  isOpen: Boolean,
});

const navigationItems = ref([
  { label: "sidenav.bill", path: "/" },
  { label: "sidenav.history", path: "/history" },
  { label: "sidenav.planning", path: "/planning" },
  { label: "sidenav.newRecord", path: "/record" },
  { label: "sidenav.categories", path: "/categories" },
]);

function navigateTo(item) {
  router.push(item.path);
  setTitle(t(item.label));
}

watchEffect(() => {
  navigationItems.value.forEach(item => {
    setTitle(t(item.label));
  });
});
</script>
