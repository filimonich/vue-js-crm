<template>
  <div class="breadcrumb-wrap">
    <router-link to="/history" class="breadcrumb">История</router-link>
    <a class="breadcrumb">
      {{
        categories[numericCategoryIndex].records[numericRecordIndex]
          .selectedType === "income"
          ? "Доход"
          : "Расход"
      }}
    </a>
  </div>
  <div
    class="row"
    v-if="
      categories.length > numericCategoryIndex &&
      categories[numericCategoryIndex].records.length > numericRecordIndex
    "
  >
    <div class="col s12 m6">
      <div
        class="card"
        :class="
          categories[numericCategoryIndex].records[numericRecordIndex]
            .selectedType === 'income'
            ? 'green'
            : 'red'
        "
      >
        <div class="card-content white-text">
          <p>
            Описание:
            {{
              categories[numericCategoryIndex].records[numericRecordIndex]
                .name || "-"
            }}
          </p>
          <p>
            Сумма:
            {{
              formatCurrency(
                categories[numericCategoryIndex].records[numericRecordIndex]
                  .limit || "-"
              )
            }}
          </p>
          <p>Категория: {{ categories[numericCategoryIndex].name || "-" }}</p>
          <small>{{
            categories[numericCategoryIndex].records[numericRecordIndex]
              .createdDate || "-"
          }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categories = computed(() => store.state.auth.categories);
const props = defineProps(["categoryIndex", "recordIndex"]);
const numericCategoryIndex = computed(() => parseInt(props.categoryIndex, 10));
const numericRecordIndex = computed(() => parseInt(props.recordIndex, 10));

console.log("categories in detail", categories.value);
console.log("categoryIndex:", numericCategoryIndex.value);
console.log("recordIndex:", numericRecordIndex.value);
console.log(
  "categories.value[numericCategoryIndex.value]",
  categories.value[numericCategoryIndex.value]
);

const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};

const tabTitle = computed(() => {
  return categories.value[numericCategoryIndex.value].records[
    numericRecordIndex.value
  ].selectedType === "income"
    ? "Доход"
    : "Расход";
});

onMounted(() => {
  document.title = `${tabTitle.value} || CRM`;
});
</script>
