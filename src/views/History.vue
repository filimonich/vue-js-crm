<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("history.title") }}</h3>
    </div>
    <template v-if="!getCategoryName(0) || getCategoryName(0) === '-'">
      <div class="center">
        <div class="margin">
          <p class="card-title">{{ $t("history.empty") }}</p>
        </div>
        <div>
          <router-link to="/record">
            <a class="btn waves-effect waves-light">{{
              $t("other.newRecord")
            }}</a>
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <AsyncPieCart />
      <AsyncRecordList />
    </template>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loader from "@/components/loader/Loader.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const categories = computed(() => store.state.auth.categories);

const getCategoryName = categoryIndex => {
  const category = categories.value && categories.value[categoryIndex];
  return category && category.records && category.name ? category.name : "-";
};

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
