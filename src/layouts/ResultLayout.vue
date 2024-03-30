<script lang="ts">
import CardLoading from "../components/Loading/SkeletonLoading/CardLoading.vue";
import Pagination from "../components/Pagination.vue";
import { capitalizeWord } from "../utils/handleWord";

export default {
  props: ["loading", "title", "totalPage", "currentPage", "type"],
  methods: {
    capitalizeWord,
  },
  created() {
    this.$watch(
      () => this.$props.loading,
      () => {
        console.log("Is Loading: " + this.loading);
      },
      { immediate: true }
    );
  },
  components: { CardLoading, Pagination },
};
</script>

<template>
  <main class="text-white px-8">
    <h1 class="text-2xl font-bold">{{ capitalizeWord(title) }}</h1>
    <section
      v-if="loading"
      class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <CardLoading :key="index" v-for="index in Array(12).keys()" />
    </section>
    <section v-else>
      <slot />
    </section>

    <Pagination
      v-if="totalPage > 1 && totalPage"
      :type="type"
      :currentPage="currentPage"
      :totalPage="totalPage"
    />
  </main>
</template>
