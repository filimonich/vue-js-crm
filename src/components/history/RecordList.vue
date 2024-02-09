<template>
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
        <template
          v-for="(category, categoryIndex) in categories"
          :key="categoryIndex"
        >
          <template v-if="category.records && category.records.length > 0">
            <tr
              v-for="(record, recordIndex) in category.records"
              :key="recordIndex"
            >
              <td>{{ getTotalIndex(categoryIndex, recordIndex) }}</td>
              <td>{{ record.limit || "-" }}</td>
              <td>{{ record.createdDate || "-" }}</td>
              <td>{{ category.name || "-" }}</td>
              <td>
                <span
                  :class="{
                    'white-text': true,
                    badge: true,
                    red: record.selectedType === 'outcome',
                    green: record.selectedType === 'income',
                  }"
                >
                  {{ record.selectedType === "income" ? "Доход" : "Расход" }}
                </span>
              </td>
              <td>
                <button
                  class="btn-small btn"
                  @click="openDetail(categoryIndex, recordIndex)"
                >
                  <i class="material-icons">open_in_new</i>
                </button>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const categories = computed(() => store.state.auth.categories);

// function openDetail(categoryIndex, recordIndex) {
//   // Убедитесь, что categoryIndex и recordIndex являются числами
//   router.push({
//     name: "detail",
//     query: {
//       categoryIndex: categoryIndex.toString(),
//       recordIndex: recordIndex.toString(),
//     },
//   });
// }

function openDetail(categoryIndex, recordIndex) {
  // Убедитесь, что categoryIndex и recordIndex являются числами
  router.push({
    name: "detail",
    query: {
      categoryIndex: categoryIndex, // передавайте как числа, если это возможно
      recordIndex: recordIndex,
    },
  });
}

function getTotalIndex(categoryIndex, recordIndex) {
  let totalIndex = 1;
  for (let i = 0; i < categoryIndex; i++) {
    totalIndex += categories.value[i].records.length;
  }
  return totalIndex + recordIndex;
}

console.log("categories", categories.value);
</script>
