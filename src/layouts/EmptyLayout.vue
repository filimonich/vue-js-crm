<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup>
import messages from "@/plugins/messages";
import { ref, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";

const store = useStore();
const authError = ref("");
const { proxy } = getCurrentInstance();

watch(
  () => store.state.auth.authError,
  newError => {
    try {
      proxy.$handleError(messages[newError]);
      store.commit("auth/clearAuthError");
    } catch (e) {}
  }
);
</script>
