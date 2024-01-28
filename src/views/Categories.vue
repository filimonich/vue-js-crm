<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <form @submit.prevent="createCategory">
              <div class="input-field">
                <input id="name" type="text" v-model="categoryName" />
                <label for="name">Название</label>
                <span class="helper-text invalid">Введите название</span>
              </div>

              <div class="input-field">
                <input id="limit" type="number" v-model.number="limit" />
                <label for="limit">Лимит</label>
                <span class="helper-text invalid">Минимальная величина</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
        <div class="col s12 m6" v-if="selectedCategory">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="updateCategory">
              <div class="input-field">
                <select v-model="selectedCategory">
                  <option
                    v-for="category in categories"
                    :key="category.name"
                    :value="category"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <label>Выберите категорию</label>
              </div>

              <div class="input-field">
                <input type="text" id="name" v-model="selectedCategory.name" />
                <label for="name">Название</label>
                <span class="helper-text invalid">TITLE</span>
              </div>

              <div class="input-field">
                <input
                  id="limit"
                  type="number"
                  v-model.number="selectedCategory.limit"
                />
                <label for="limit">Лимит</label>
                <span class="helper-text invalid">LIMIT</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categoryName = ref("");
const limit = ref(100);

const categories = computed(() => store.state.auth.categories);
const selectedCategory = ref(null);

watch(
  categories,
  newCategories => {
    if (newCategories && newCategories.length > 0) {
      selectedCategory.value = newCategories[0];
    } else {
      selectedCategory.value = null;
    }
  },
  { immediate: true }
);

onMounted(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

onUpdated(() => {
  M.FormSelect.init(document.querySelectorAll("select"));
});

const updateCategory = async () => {
  if (selectedCategory.value) {
    try {
      const categoryId = categories.value.findIndex(
        category => category.name === selectedCategory.value.name
      );

      await store.dispatch("auth/updateCategory", {
        categoryId: categoryId,
        categoryName: selectedCategory.value.name,
        limit: selectedCategory.value.limit,
      });
    } catch (e) {}
  }
};

const createCategory = async () => {
  try {
    await store.dispatch("auth/createCategory", {
      categoryName: categoryName.value,
      limit: limit.value,
    });
  } catch (e) {}
};
</script>
