<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p class="currency-line">
              <span>12.0 Р</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Курс валют</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>Курс</th>
                  <th>Дата</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(rate, currency) in rates" :key="currency">
                  <td>{{ currency }}</td>
                  <td>{{ rate.toFixed(4) }}</td>
                  <td>{{ formattedDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

const store = useStore();

const rates = computed(() => store.getters["rates"]);

const formattedDate = computed(() => {
  const timestamp = store.getters["timestamp"];
  return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : null;
});

onMounted(async () => {
  await store.dispatch("fetchRate");
});
</script>
