<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../queries/episodes";
import Card from "../components/Card.vue";
export default {
  data() {
    return {
      episodes: [] as any,
      loading: false,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchEpisodes();
      },
      { immediate: true }
    );
  },
  methods: {
    fetchEpisodes: function () {
      const { onResult, loading } = useQuery(getEpisodes);
      this.loading = loading.value;
      console.log(loading.value);
      onResult((result) => {
        if (result.data) {
          this.loading = loading.value;
          const arrEps = [...result.data.episodes];

          this.episodes = arrEps.sort(
            (a: any, b: any) => b.created_at - a.created_at
          );
        }
      });
    },
  },
  components: { Card },
};
</script>

<template>
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <main className="h-screen text-white mx-8 mt-2">
    <header className="font-bold  xl:text-3xl lg:text-2xl text-xl">
      Latest Episodes
    </header>
    <section
      className="w-full grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="ep in episodes"
        :id="ep._id"
        :images="ep.series.images"
        :ep-num="ep.epNum"
        :title="ep.series.title"
      />
    </section>
  </main>
</template>
