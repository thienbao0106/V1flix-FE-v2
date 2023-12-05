<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../queries/episodes";
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      episodes: [] as any,
      loading: false,
      totalPage: 0,
      currentPage: 0,
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        console.log(this.$route.query);
        const currentPage: any = this.$route.query.page;
        this.fetchEpisodes(parseInt(currentPage));
      },
      { immediate: true }
    );
  },
  methods: {
    fetchEpisodes: function (page: number) {
      console.log(Number.isNaN(page));
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;
      const { onResult, loading } = useQuery(getEpisodes(currentPage - 1, 5));
      this.loading = loading.value;
      console.log(loading.value);
      onResult((result) => {
        if (result.data) {
          this.loading = loading.value;
          const { episodes, totalPage } = result.data.episodes;
          console.log(result.data.episodes);
          this.totalPage = totalPage;
          const arrEps = [...episodes];

          this.episodes = arrEps.sort(
            (a: any, b: any) => b.created_at - a.created_at
          );
        }
      });
    },
  },
  components: { Card, Pagination },
};
</script>

<template>
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <main className="h-full text-white mx-8 mt-2">
    <header className="font-bold  xl:text-3xl lg:text-2xl text-xl">
      Latest Episodes
    </header>
    <section
      className="w-full grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="ep in episodes"
        :id="ep._id"
        :images="ep.series.images"
        :ep-num="ep.epNum"
        :ep-created-at="ep.created_at"
        :title="ep.series.title"
      />
    </section>
    <div class="mt-5">
      <Pagination
        type="latest"
        :current-page="currentPage"
        :total-page="totalPage"
      />
    </div>
  </main>
</template>
