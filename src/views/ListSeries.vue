<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { listSeriesQuery } from "../queries/series";
import Card from "../components/Card.vue";
import Loading from "../components/Loading/Loading.vue";

import Pagination from "../components/Pagination.vue";
import ResultLayout from "../layouts/ResultLayout.vue";

export default {
  data() {
    return {
      listSeries: [] as any[],
      loading: true,
      totalPage: 0,
      currentPage: 0,
    };
  },

  methods: {
    fetchSeries: function (page: number) {
      console.log(Number.isNaN(page));
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;

      const { onResult } = useQuery(listSeriesQuery(currentPage - 1, 12));

      onResult((result) => {
        if (!result.data) return;
        const { series, totalPage } = result.data.series;
        this.listSeries = series;
        this.totalPage = totalPage;
        this.loading = false;
      });
    },
  },

  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        console.log(this.$route.query);
        const currentPage: any = this.$route.query.page;
        this.fetchSeries(parseInt(currentPage));
      },
      { immediate: true }
    );
  },
  components: { Card, Loading, Pagination, ResultLayout },
};
</script>

<template>
  <main>
    <ResultLayout :loading="loading" :title="`List Series`">
      <section
        class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
      >
        <Card
          v-for="s in listSeries"
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :total_episodes="s.total_episodes"
          :type="s.type"
          :view="s.view"
        />
      </section>
    </ResultLayout>

    <Pagination
      v-if="totalPage > 1"
      type="series"
      :currentPage="currentPage"
      :totalPage="totalPage"
    />
  </main>
</template>
