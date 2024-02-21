<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("home.bill") }}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="reloadData"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">{{ $t("home.billCurrency") }}</span>

            <p class="currency-line">
              <span>{{ formatCurrency(bill, "RUB") }}</span>
            </p>
            <p class="currency-line">
              <span>{{ formatCurrency(accountInEUR, "EUR") }}</span>
            </p>
            <p class="currency-line">
              <span>{{ formatCurrency(accountInUSD, "USD") }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">{{ $t("home.rate") }}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>{{ $t("home.currency") }}</th>
                  <th>{{ $t("home.exchange") }}</th>
                  <th>{{ $t("home.date") }}</th>
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
import { ref, onMounted, computed } from "vue";
import Loader from "@/components/loader/Loader.vue";

const loading = ref(false);

const store = useStore();
const rates = computed(() => store.getters["rates"]);
const bill = computed(() => store.state.auth.bill);

const formattedDate = computed(() => {
  const timestamp = store.getters["timestamp"];
  return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : null;
});

const accountInUSD = computed(() => {
  const rubToUsdRate = rates.value["RUB"];
  return rubToUsdRate ? bill.value / rubToUsdRate : 0;
});

const accountInEUR = computed(() => {
  const usdToEurRate = rates.value["EUR"];
  return usdToEurRate ? accountInUSD.value * usdToEurRate : 0;
});

const formatCurrency = (value, currencyCode = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
};

const reloadData = async () => {
  loading.value = true;
  await store.dispatch("fetchRate");
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await store.dispatch("fetchRate");
  loading.value = false;
});
</script>
