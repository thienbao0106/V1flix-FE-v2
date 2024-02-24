<script setup lang="ts">
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
//temp logic

const isValid = ["/login", "/register", "/room"].some((route) =>
  window.location.pathname.includes(route)
);
</script>

<template>
  <main class="bg-bgColor">
    <Header v-if="!isValid" />
    <slot />
    <Footer v-if="!isValid" />
  </main>
</template>
