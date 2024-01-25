import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "jquery";
import "materialize-css";
import tooltipDirective from "@/directives/tooltip.directive";
import ToastUtil from "@/plugins/toast.plugin";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
let app;

onAuthStateChanged(auth, user => {
  store.dispatch("auth/fetchUserData");
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(ToastUtil);
    app.directive("tooltip", tooltipDirective);
    app.provide("auth", auth);
    app.mount("#app");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
});
