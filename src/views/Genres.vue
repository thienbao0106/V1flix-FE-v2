<script lang="ts">
import { useRoute } from "vue-router";
import { capitalizeWord } from "../utils/handleWord";
import Card from "../components/Card.vue";
import ResultLayout from "../layouts/ResultLayout.vue";
import { useQuery } from "@vue/apollo-composable";
import { findGenres } from "../queries/genres";
export default {
  data() {
    return {
      genres: {} as any,
      loading: false,
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
        console.log(this.genre);
        const { onResult } = useQuery(findGenres(this.id));
        this.loading = false;
        onResult((result: any) => {
          if (result.data) {
            this.genres = result.data.findGenresById;
          }
        });
        this.loading = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        console.log("called");
        this.fetchSeriesGenres();
      },
      { immediate: true }
    );
  },
  components: { Card, ResultLayout },
};
</script>

<template>
  <ResultLayout :loading="loading" :title="`${genre} Anime`">
    <main
      v-if="genres.series?.length > 0"
      class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="series in genres.series"
        :id="series._id"
        :images="series.images"
        :total_episodes="series.total_episodes"
        :ep-created-at="series.created_at"
        :title="series.title"
        :status="series.status"
      />
    </main>
    <main class="flex w-full h-screen flex justify-center items-center" v-else>
      <h1>This genres doesn't have any show</h1>
    </main>
  </ResultLayout>
</template>
