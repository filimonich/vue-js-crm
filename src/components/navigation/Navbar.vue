<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="toggleSidenav">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ formattedDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
          >
            {{ displayName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link to="/login" class="black-text" @click="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance, onMounted, ref, computed, watchEffect } from "vue";
import { updateFormattedDate } from "@/utils/date.utils.js";
import messages from "@/plugins/messages";
import M from "materialize-css";

let instance;
let intervalId;
const formattedDate = ref("");
const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const auth = computed(() => store.state.auth);
let displayName = ref("Loading...");

watchEffect(() => {
  displayName.value = auth.value?.name || "Loading...";
});

onMounted(() => {
  instance = getCurrentInstance();
  formattedDate.value = updateFormattedDate();
  intervalId = setInterval(() => {
    formattedDate.value = updateFormattedDate();
  }, 1000);

  const dropdownElements = document.querySelectorAll(".dropdown-trigger");
  M.Dropdown.init(dropdownElements, {
    constrainWidth: false,
    alignment: "left", // Например, выравнивание выпадающего списка
    // hover: true, // Выпадающее меню будет активироваться при наведении
    // Другие опции...
  });
});

const toggleSidenav = () => {
  if (instance) {
    const { emit } = instance;
    emit("toggleSidenav");
  }
};

const logout = async () => {
  clearInterval(intervalId);
  console.log("logout :", store);
  router.push({ name: "login", query: { loggedOut: "true" } });
  await store.dispatch("auth/logout");
  proxy.$showToast(messages.logout);
};
</script>
