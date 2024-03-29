<script lang="ts">
import CardLoading from "../components/Loading/SkeletonLoading/CardLoading.vue";
import { capitalizeWord } from "../utils/handleWord";

export default {
  props: ["loading", "title"],
  methods: {
    capitalizeWord,
  },
  components: { CardLoading },
};
</script>

<template>
  <div>
    <div class="text-white px-8" v-if="loading">
      <h1 class="text-2xl font-bold">{{ capitalizeWord(title) }}</h1>
      <section
        class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
      >
        <CardLoading
          v-if="loading"
          :key="index"
          v-for="index in Array(12).keys()"
        />
      </section>
    </div>
    <main class="text-white px-8">
      <h1 class="text-2xl font-bold">{{ capitalizeWord(title) }}</h1>
      <slot />
    </main>
  </div>
</template>
