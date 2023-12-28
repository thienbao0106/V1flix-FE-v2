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
      <section
        className="w-full grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
      >
        <slot />
      </section>
    </main>
  </div>
</template>
