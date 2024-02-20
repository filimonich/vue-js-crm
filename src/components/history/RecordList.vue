<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("history.amount") }}</th>
          <th>{{ $t("history.date") }}</th>
          <th>{{ $t("history.category") }}</th>
          <th>{{ $t("history.type") }}</th>
          <th>{{ $t("history.open") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in paginatedRecords" :key="index">
          <td>{{ calculateRowNumber(index) }}</td>
          <td>{{ formatCurrency(record.limit) || "-" }}</td>
          <td>{{ record.createdDate || "-" }}</td>
          <td>{{ record.categoryName || "-" }}</td>
          <td>
            <span :class="getRecordTypeClass(record)">
              {{ getRecordTypeText(record.selectedType) }}
            </span>
          </td>
          <td>
            <button class="btn-small btn" @click="openDetail(record, index)">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="totalPages"
      :click-handler="handlePageChange"
      :prev-text="$t('history.prev')"
      :next-text="$t('history.next')"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      :prev-link-class="'waves-effect'"
      :next-link-class="'waves-effect'"
      :margin-pages="1"
    ></paginate>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const store = useStore();
const categories = computed(() => store.state.auth.categories);
const itemsPerPage = 5;
const currentPage = ref(1);

const calculateRowNumber = index => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

const getRecordTypeClass = record => {
  return {
    "white-text": true,
    badge: true,
    red: record.selectedType === "outcome",
    green: record.selectedType === "income",
  };
};

const getRecordTypeText = selectedType => {
  return selectedType === "income" ? t("history.income") : t("history.outcome");
};

const openDetail = (record, index) => {
  const recordIndex = categories.value
    .find(category => category.records.indexOf(record) !== -1)
    .records.indexOf(record);

  const categoryIndex = categories.value.findIndex(category =>
    category.records.includes(record)
  );

  // console.log("record", record);
  // console.log("index", index);
  // console.log("recordIndex", recordIndex);
  // console.log("categoryIndex", categoryIndex);

  router.push({
    name: "detail",
    query: {
      categoryIndex: categoryIndex,
      recordIndex: recordIndex,
    },
  });
};

const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};

const calculateAllRecords = () => {
  const allRecords =
    categories.value && Array.isArray(categories.value)
      ? categories.value.reduce(
          (acc, category) => acc.concat(category.records || []),
          []
        )
      : [];

  allRecords.forEach((record, index) => {
    record.categoryName = categories.value.find(category =>
      category.records.some(rec => rec === record)
    ).name;
    // console.log("record.createdDate", record.createdDate);
    // console.log("formatCurrency(record.limit)", formatCurrency(record.limit));
    // console.log("categoryName", record.categoryName);
    // console.log(
    //   "category index",
    //   categories.value.findIndex(category => category.records.includes(record))
    // );
  });

  return allRecords;
};

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const allRecords = calculateAllRecords();

  const sortedRecords = allRecords
    .sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return dateB - dateA || a.createdDate.localeCompare(b.createdDate);
    })
    .reverse();

  const slicedRecords = sortedRecords.slice(start, end);
  return slicedRecords;
});

const totalPages = computed(() => {
  const allRecords = calculateAllRecords();

  return Math.ceil(allRecords.length / itemsPerPage);
});

const handlePageChange = newPage => {
  currentPage.value = newPage;
};
</script>
