<template>
  <template v-if="isCategoriesEmpty">
    <div class="center">
      <div class="margin">
        <p class="card-title">{{ $t("planning.noCategories") }}</p>
      </div>
      <div>
        <router-link to="/categories">
          <a class="btn waves-effect waves-light">{{
            $t("planning.newCategory")
          }}</a>
        </router-link>
      </div>
    </div>
  </template>
  <template v-else>
    <section>
      <div v-for="(category, index) in categories" :key="index">
        <p>
          <strong>{{ category.name }}: </strong>
          {{ formatCurrency(category.amount) }}
          {{ $t("planning.outOf") }}
          {{ formatCurrency(category.limit) }}
        </p>
        <div
          class="progress"
          v-tooltip="getTooltipText(category.amount, category.limit)"
        >
          <div
            class="determinate"
            :class="{
              green: progressWidth(category.amount, category.limit) < 100,
              red: progressWidth(category.amount, category.limit) === 100,
            }"
            :style="{
              width: `${progressWidth(category.amount, category.limit)}%`,
            }"
          ></div>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const categories = computed(() => store.state.auth.categories);

const isCategoriesEmpty = computed(() => {
  const categories = store.state.auth.categories;
  return !Array.isArray(categories) || categories.length === 0;
});

function progressWidth(amount, limit) {
  return (amount / limit) * 100;
}

function getTooltipText(amount, limit) {
  const width = progressWidth(amount, limit);
  if (width < 100) {
    return `${t("planning.remainsDial")}: ${formatCurrency(limit - amount)}`;
  } else {
    return t("planning.categoryTyped");
  }
}

const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};
</script>
