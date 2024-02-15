<template>
  <div class="history-chart">
    <div id="chart">
      <apexchart
        type="pie"
        width="380"
        :options="chartOptions"
        :series="pieSeries"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categories = computed(() => store.state.auth.categories);

const pieSeries = computed(() =>
  categories.value.map(category => category.amount)
);

const chartOptions = ref({
  dataLabels: {
    enabled: false,
  },
  labels: categories.value.map(category => category.name),
});
</script>
