<template>
  <template v-if="!paginatedRecords || paginatedRecords.length === 0">
    <span class="card-title">Нет записей. Создайте</span>
    <router-link to="/record">
      <a> новую запись </a>
    </router-link>
  </template>
  <template v-else>
    <section>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in paginatedRecords" :key="index">
            <td>{{ calculateRowNumber(index) }}</td>
            <td>{{ formatCurrency(record.limit) || "-" }}</td>
            <td>{{ record.createdDate || "-" }}</td>
            <td>{{ getCategoryName(index) || "-" }}</td>
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
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        :prev-link-class="'waves-effect'"
        :next-link-class="'waves-effect'"
        :margin-pages="1"
      ></paginate>
    </section>
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const categories = computed(() => store.state.auth.categories);
const itemsPerPage = 2;
const currentPage = ref(1);

const calculateRowNumber = index => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

const getCategoryName = categoryIndex => {
  const category = categories.value && categories.value[categoryIndex];
  return category ? category.name || "-" : "-";
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
  return selectedType === "income" ? "Доход" : "Расход";
};

const openDetail = (record, index) => {
  const recordIndex = categories.value
    .find(category => category.records.indexOf(record) !== -1)
    .records.indexOf(record);

  router.push({
    name: "detail",
    query: {
      categoryIndex: index,
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
  return categories.value && Array.isArray(categories.value)
    ? categories.value.reduce(
        (acc, category) => acc.concat(category.records || []),
        []
      )
    : [];
};

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const allRecords = calculateAllRecords();

  const sortedRecords = allRecords.sort((a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return dateB - dateA;
  });

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
