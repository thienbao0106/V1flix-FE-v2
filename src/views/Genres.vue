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
    console.log(name);
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
            console.log(result.data);
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
    <p class="py-4">{{ genres.description }}</p>
    <Card
      v-for="series in genres.series"
      :id="series._id"
      :images="series.images"
      :total_episodes="series.total_episodes"
      :ep-created-at="series.created_at"
      :title="series.title"
      :status="series.status"
    />
  </ResultLayout>
</template>
