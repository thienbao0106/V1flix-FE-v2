<script lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { capitalizeWord } from "../utils/handleWord";
import { findGenres } from "../queries/genres";
import Card from "../components/Card.vue";
import Loading from "../components/Loading.vue";
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
      this.loading = true;
      try {
        console.log(this.genre);
        const { onResult } = useQuery(findGenres(this.id));
        onResult((result: any) => {
          console.log(result.data);
          if (!result.data) return;
          this.genres = result.data.findGenresById;
        });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
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
  components: { Card, Loading },
};
</script>

<template>
  <Loading v-if="loading" message="Getting data" />
  <h1 class="px-8 font-bold text-xl text-white">{{ genre }} Anime</h1>
  <main
    class="text-white px-8"
    v-if="
      !loading && Object.keys(genres).length > 0 && genres.series.length > 0
    "
  >
    <section
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
    </section>
  </main>
  <main
    v-if="Object.keys(genres).length > 0 && genres.series.length === 0"
    class="flex w-full h-screen flex justify-center items-center text-white font-bold"
  >
    <h1>This genres doesn't have any show</h1>
  </main>
</template>
