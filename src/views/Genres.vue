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
        const { onResult, loading } = useQuery(findGenres(this.id));
        this.loading = loading.value;
        onResult((result: any) => {
          if (result.data) {
            this.loading = loading.value;
            this.genres = result.data.findGenresById;
          }
        });
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
  </ResultLayout>
</template>
