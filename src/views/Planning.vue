<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("planning.title") }}</h3>
      <h4>{{ formatCurrency(bill, "RUB") }}</h4>
    </div>

    <AsyncDeterminate />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";

const store = useStore();
const bill = computed(() => store.state.auth.bill);
const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};

const AsyncDeterminate = defineAsyncComponent({
  loader: () => import("@/components/planning/Determinate.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
</script>
