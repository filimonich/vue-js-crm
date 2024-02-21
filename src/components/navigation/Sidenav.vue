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
import { defineProps, ref, onBeforeMount } from "vue";
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

onBeforeMount(() => {
  const initialPath = router.currentRoute.value.path;
  const item = navigationItems.value.find(i => i.path === initialPath);
  if (item) {
    setTitle(t(item.label));
  }
});

function navigateTo(item) {
  router.push(item.path);
  setTitle(t(item.label));
}
</script>
