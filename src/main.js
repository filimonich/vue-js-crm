import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "jquery";
import "materialize-css";
import "materialize-css/dist/js/materialize.min";
import tooltipDirective from "@/directives/tooltip.directive";
import ToastUtil from "@/utils/toast.util";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeE9suWVOudy-hB6wo647qCzkbwdGH2iU",
  authDomain: "vue-js-crm-fss.firebaseapp.com",
  databaseURL:
    "https://vue-js-crm-fss-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-js-crm-fss",
  storageBucket: "vue-js-crm-fss.appspot.com",
  messagingSenderId: "985711851326",
  appId: "1:985711851326:web:dffa5392f87142a7159e6f",
  measurementId: "G-T9T8BVEQFB",
};

initializeApp(firebaseConfig);
const auth = getAuth();

const vueApp = createApp(App);
vueApp.use(store);
vueApp.use(router);
vueApp.use(ToastUtil);
vueApp.directive("tooltip", tooltipDirective);
vueApp.provide("auth", auth);
vueApp.mount("#app");

document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
});
