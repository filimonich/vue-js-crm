<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="toggleSidenav">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">12.12.24</span>
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
              <a href="#" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";

let instance;

onMounted(() => {
  instance = getCurrentInstance();
});

const toggleSidenav = () => {
  if (instance) {
    const { emit } = instance;
    emit("toggleSidenav");
  }
};
</script>
