import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import tooltipDirective from "@/directives/tooltip.directive";
import { install as installToastPlugin } from "@/utils/toast.plugin.js";

const app = createApp(App);
installToastPlugin(app);
app.directive("tooltip", tooltipDirective);
app.use(store);
app.use(router);
app.mount("#app");
