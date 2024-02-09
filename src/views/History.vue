<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <AsyncPieCart />
    <AsyncRecordList />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";

const AsyncPieCart = defineAsyncComponent({
  loader: () => import("@/components/history/PieChart.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
const AsyncRecordList = defineAsyncComponent({
  loader: () => import("@/components/history/RecordList.vue"),
  loadingComponent: Loader,
  delay: 0,
  timeout: 3000,
});
</script>
