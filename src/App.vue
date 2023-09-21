<script setup lang="ts">
import Header from "./components/Header.vue";

//temp logic
console.log(window.location.pathname);
const isValid = window.location.pathname === "/";
</script>

<template>
  <main class="bg-bgColor">
    <Header v-if="isValid" />
    <router-view />
  </main>
</template>

<style>
@import "./style.css";
</style>
