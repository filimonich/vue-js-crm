<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <MakeCategory />
        <EditCategory />
      </div>
    </section>
  </div>
</template>

<script setup>
import MakeCategory from "@/components/category/MakeCategory";
import EditCategory from "@/components/category/EditCategory";
</script>
