<script lang="ts">
import CardLoading from "../components/Loading/SkeletonLoading/CardLoading.vue";
import ListUserLoading from "../components/Loading/SkeletonLoading/ListUserLoading.vue";

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
  components: { CardLoading, Pagination, ListUserLoading },
};
</script>

<template>
  <main class="text-white px-8">
    <h1 v-if="title" class="text-2xl font-bold">{{ capitalizeWord(title) }}</h1>
    <section
      v-if="loading"
      class="w-full grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 2xl:gap-x-3 xl:gap-x-7 lg:gap-x-5 gap-x-3 gap-y-4 lg:mt-4 mt-7"
    >
      <CardLoading
        v-if="type === 'series'"
        :key="index"
        v-for="index in Array(12).keys()"
      />
      <ListUserLoading v-else v-for="_ in Array(12).keys()" />
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
