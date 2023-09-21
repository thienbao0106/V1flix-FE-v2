<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <main class="bg-bgColor">
    <Header />
    <router-view />
  </main>
</template>

<style>
@import "./style.css";
</style>
