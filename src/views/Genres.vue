<script lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { capitalizeWord } from "../utils/handleWord";
import { findGenres } from "../queries/genres";
import Card from "../components/Card.vue";

import CardLoading from "../components/Loading/SkeletonLoading/CardLoading.vue";
export default {
  data() {
    return {
      genres: {} as any,
      loading: true,
    };
  },
  setup() {
    const route = useRoute();
    const { id, name } = route.params;
    return {
      genre: name,
      id,
    };
  },
  methods: {
    capitalizeWord,
    fetchSeriesGenres: function () {
      try {
        const { onResult } = useQuery(findGenres(this.id));
        onResult((result: any) => {
          console.log(result.data);
          if (!result.data) return;
          this.genres = result.data.findGenresById;
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$watch(
      () => this.$route.params.name,
      () => {
        console.log("called");
        document.title = `${this.genre} - V1flix`;
        this.fetchSeriesGenres();
      },
      { immediate: true }
    );
  },
  components: { Card, CardLoading },
};
</script>

<template>
  <section>
    <h1
      class="px-8 font-bold text-xl text-white flex w-full flex-row items-center gap-x-2"
    >
      <span> Genres </span>
      <span class="text-sm"> > </span>
      <span>
        {{ genre }}
      </span>
    </h1>
    <main class="text-white px-8">
      <section
        class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
      >
        <CardLoading
          v-if="loading"
          :key="index"
          v-for="index in Array(12).keys()"
        />
        <Card
          v-else
          v-for="series in genres.series"
          :id="series._id"
          :images="series.images"
          :total_episodes="series.total_episodes"
          :ep-created-at="series.created_at"
          :title="series.title"
          :status="series.status"
        />
      </section>
    </main>
    <main
      v-if="Object.keys(genres).length > 0 && genres.series.length === 0"
      class="flex w-full h-screen flex justify-center items-center text-white font-bold"
    >
      <h1>This genres doesn't have any show</h1>
    </main>
  </section>
</template>
