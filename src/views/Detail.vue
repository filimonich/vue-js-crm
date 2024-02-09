<template>
  <div class="breadcrumb-wrap">
    <a href="/history" class="breadcrumb">История</a>
    <a class="breadcrumb"> Расход </a>
  </div>
  <div class="row">
    <div class="col s12 m6">
      <div class="card red">
        <div class="card-content white-text">
          <p>Описание:</p>
          <p>Сумма:</p>
          <p>Категория:</p>

          <small>12.12.12</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categories = computed(() => store.state.auth.categories);
console.log("categories in detail", categories.value);

const props = defineProps(["categoryIndex", "recordIndex"]);

const numericCategoryIndex = computed(() => parseInt(props.categoryIndex, 10));
const numericRecordIndex = computed(() => parseInt(props.recordIndex, 10));

console.log("categoryIndex:", numericCategoryIndex.value);
console.log("recordIndex:", numericRecordIndex.value);

const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};
</script>
