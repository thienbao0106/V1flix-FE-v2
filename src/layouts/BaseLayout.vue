<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
//temp logic

const isValid = ["/login", "/register"].some(
  (route) => !window.location.pathname.includes(route)
);
</script>

<template>
  <main class="bg-bgColor">
    <Header v-if="isValid" />
    <slot />
    <Footer />
  </main>
</template>
