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
            USER NAME
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
import { getCurrentInstance, onMounted, ref } from "vue";
import { updateFormattedDate } from "@/utils/date.utils";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const formattedDate = ref("");
let instance;
let intervalId;

onMounted(() => {
  instance = getCurrentInstance();
  formattedDate.value = updateFormattedDate();
  intervalId = setInterval(() => {
    formattedDate.value = updateFormattedDate();
  }, 1000);

  const dropdownElement = document.querySelector(".dropdown-trigger");
  M.Dropdown.init(dropdownElement);
});

const toggleSidenav = () => {
  if (instance) {
    const { emit } = instance;
    emit("toggleSidenav");
  }
};

const logout = async () => {
  await store.dispatch("logout");
  clearInterval(intervalId);
  router.push("/login?message=logout");
};
</script>
