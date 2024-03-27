<script setup lang="ts">
import BaseLayout from "./layouts/BaseLayout.vue";
import Loading from "./components/Loading/Loading.vue";
</script>

<template>
  <BaseLayout>
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <!-- Default -->
        <template #default>
          <component :is="Component" />
        </template>

        <!-- Loading -->
        <template #fallback>
          <Loading message="Waiting for the page load" />
        </template>
      </suspense>
    </router-view>
  </BaseLayout>
</template>

<style>
@import "./style.css";
</style>
