<script lang="ts">
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const { keyword } = route.query;
    return {
      keyword: keyword || "",
    };
  },
};
</script>

<template>
  <main className="xl:px-8 px-4 text-white xl:flex xl:flex-row lg:space-y-8">
    <section aria-label="result-query" className="xl:basis-3/4 space-y-5 pr-8">
      <h1 className="text-3xl font-bold">{{ `Result for ${keyword}` }}</h1>
    </section>
  </main>
</template>
