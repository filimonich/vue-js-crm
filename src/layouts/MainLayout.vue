<template>
  <div class="app-main-layout">
    <Navbar />
    <Sidenav />
    <main class="app-content">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/navigation/Navbar";
import Sidenav from "@/components/navigation/Sidenav";
</script>
