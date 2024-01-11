import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
// import Loader from "@/components/loader/Loader";

const app = createApp(App);
// app.component("Loader", Loader);
app.use(store);
app.use(router);
app.mount("#app");
