import axios from "axios";

const currencyModule = {
  state: () => ({
    rates: {},
    timestamp: null,
  }),
  mutations: {
    SET_RATES(state, payload) {
      state.rates = payload;
    },
    SET_TIMESTAMP(state, payload) {
      state.timestamp = payload;
    },
  },
  actions: {
    async fetchRate({ commit }) {
      const apiKey = process.env.VUE_APP_CURRENCY_API_KEY;
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/latest.json",
          {
            params: {
              app_id: apiKey,
              symbols: "USD,EUR,RUB",
            },
          }
        );
        console.log("API response:", response);
        commit("SET_RATES", response.data.rates);
        commit("SET_TIMESTAMP", response.data.timestamp);
      } catch (e) {
        console.error("Error fetching rates:", e);
      }
    },
  },
  getters: {
    rates: state => state.rates,
    timestamp: state => state.timestamp,
  },
};

export default currencyModule;
