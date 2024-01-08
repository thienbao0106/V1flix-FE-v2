<script lang="ts">
import { capitalizeWord } from "../utils/handleWord";

export default {
  props: ["loading", "title"],
  methods: {
    capitalizeWord,
  },
};
</script>

<template>
  <div>
    <div class="text-4xl font-bold text-white" v-if="loading">
      <Loading message="Getting the data" />
    </div>
    <main class="text-white px-8">
      <h1 class="text-2xl font-bold">{{ capitalizeWord(title) }}</h1>
      <slot />
    </main>
  </div>
</template>
