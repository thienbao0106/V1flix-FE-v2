<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../queries/episodes";
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";
import ResultLayout from "../layouts/ResultLayout.vue";
import Loading from "../components/Loading.vue";

export default {
  data() {
    return {
      episodes: [] as any,
      loading: false,
      totalPage: 0,
      currentPage: 0 as any,
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        console.log("called");
        const currentPage: any = this.$route.query.page;
        this.fetchEpisodes(
          parseInt(currentPage) <= 0 ? 1 : parseInt(currentPage)
        );
      },
      { immediate: true }
    );
  },
  methods: {
    fetchEpisodes: function (page: number) {
      console.log("called");
      if (this.episodes.length > 0) this.episodes = [];
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;
      const { onResult } = useQuery(getEpisodes(currentPage - 1, 12));
      this.loading = true;

      onResult((result) => {
        if (result.data) {
          const { episodes, totalPage } = result.data.episodes;
          if (totalPage < currentPage) {
            this.$router.push(`/latest?page=${totalPage}`);
            return;
          }
          this.totalPage = totalPage;
          const arrEps = [...episodes];
          this.episodes = arrEps.sort(
            (a: any, b: any) => b.created_at - a.created_at
          );
        }
      });
      this.loading = false;
    },
  },
  components: { Card, Pagination, ResultLayout, Loading },
};
</script>

<template>
  <main class="text-white w-full px-8">
    <h1 class="font-bold text-3xl">Latest Anime</h1>
    <section
      v-if="!loading && episodes.length > 0"
      className="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="ep in episodes"
        :key="ep._id"
        :id="ep._id"
        :images="ep.series.images"
        :ep-num="ep.epNum"
        :ep-created-at="ep.created_at"
        :title="ep.series.title"
      />
    </section>
    <div class="flex justify-center items-center" v-else>
      <Loading message="Getting data" />
    </div>

    <div class="mt-5">
      <Pagination
        type="latest"
        :current-page="currentPage"
        :total-page="totalPage"
      />
    </div>
  </main>
</template>
