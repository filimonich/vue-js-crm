<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory />
        <EditCategory />
      </div>
    </section>
  </div>
</template>

<script setup>
import CreateCategory from "@/components/сategory/CreateCategory";
import EditCategory from "@/components/сategory/EditCategory";
</script>
