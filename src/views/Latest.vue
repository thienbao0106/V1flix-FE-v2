<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../queries/episodes";
import Card from "../components/Card.vue";
import ResultLayout from "../layouts/ResultLayout.vue";
import Loading from "../components/Loading/Loading.vue";

export default {
  data() {
    return {
      episodes: [] as any,
      loading: true,
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
      if (this.episodes.length > 0) this.episodes = [];
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;
      if (!this.loading) this.loading = true;
      const { onResult } = useQuery(getEpisodes(currentPage - 1, 12));

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
          console.log(this.episodes);
          this.loading = false;
        }
      });
    },
  },
  components: { Card, ResultLayout, Loading },
};
</script>

<template>
  <ResultLayout
    :current-page="currentPage"
    :total-page="totalPage"
    :loading="loading"
    :title="`Latest Episode`"
    type="series"
  >
    <section
      class="w-full grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 2xl:gap-x-3 xl:gap-x-7 lg:gap-x-5 gap-x-3 gap-y-4 lg:mt-4 mt-7"
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
  </ResultLayout>
</template>
