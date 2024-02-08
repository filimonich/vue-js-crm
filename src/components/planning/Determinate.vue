<template>
  <section>
    <div v-for="(category, index) in categories" :key="index">
      <p>
        <strong>{{ category.name }}: </strong>
        {{ category.amount }} из {{ category.limit }}
      </p>
      <div class="progress">
        <div
          class="determinate green"
          :style="'width: ' + (category.amount / category.limit) * 100 + '%'"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();
const state = computed(() => store.state);
const categories = computed(() => store.state.auth.categories);

console.log("state", state.value);
console.log("categories", categories.value);
</script>
