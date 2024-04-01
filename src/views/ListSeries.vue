<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { listSeriesQuery } from "../queries/series";
import Card from "../components/Card.vue";
import Loading from "../components/Loading/Loading.vue";

import ResultLayout from "../layouts/ResultLayout.vue";

export default {
  data() {
    return {
      listSeries: [] as any[],
      loading: true,
      totalPage: 0,
      currentPage: 0,
      width: window.innerWidth,
      dividedNumber: 0,
      secondDividedNumber: 0,
      indexCondition: 0,
      indexSubtract: 0,
    };
  },

  methods: {
    fetchSeries: function (page: number) {
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;

      const { onResult } = useQuery(listSeriesQuery(this.currentPage - 1, 12));

      onResult((result) => {
        if (!result.data) return;
        const { series, totalPage } = result.data.series;
        this.listSeries = series;

        this.totalPage = totalPage;
        this.loading = false;
      });
    },

    onResize: function () {
      this.width = window.innerWidth;
      console.log(this.width);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      console.log(this.width);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        const currentPage: any = this.$route.query.page;
        this.fetchSeries(parseInt(currentPage));
      },
      { immediate: true }
    );
    this.$watch(
      () => this.width,
      () => {
        this.dividedNumber =
          this.width >= 1536
            ? 7
            : this.width >= 1280 && this.width < 1536
            ? 5
            : 3;
        this.secondDividedNumber =
          this.width >= 1536
            ? 6
            : this.width >= 1280 && this.width < 1536
            ? 4
            : 4;
        this.indexCondition =
          this.width >= 1536
            ? 7
            : this.width >= 1280 && this.width < 1536
            ? 5
            : 4;
        this.indexSubtract =
          this.width >= 1536
            ? 3
            : this.width >= 1280 && this.width < 1536
            ? 4
            : -1;
      },
      { immediate: true }
    );
  },
  components: { Card, Loading, ResultLayout },
};
</script>

<template>
  <main>
    <ResultLayout
      :currentPage="currentPage"
      :totalPage="totalPage"
      :loading="loading"
      :title="`List Series`"
      type="series"
    >
      <section
        class="w-full grid 2xl:grid-cols-7 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 2xl:gap-x-3 xl:gap-x-7 lg:gap-x-5 gap-x-3 gap-y-4 lg:mt-4 mt-7"
      >
        <Card
          v-for="(s, index) in listSeries"
          :description="s.description"
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :total_episodes="s.total_episodes"
          :type="s.type"
          :view="s.view"
          :hoverPosition="{
            right: '2xl:right-[15rem] xl:right-[13rem] right-[17.5rem]',
            left: '2xl:left-[15rem] xl:left-[13rem] left-[17.5rem]',
          }"
          :condition="
            (index <= indexCondition && (index + 1) % dividedNumber === 0) ||
            (index <= indexCondition &&
              (index + 1) % secondDividedNumber === 0) ||
            (index > indexCondition &&
              (index - indexSubtract - 1) % dividedNumber === 0) ||
            (index > indexCondition &&
              (index - indexSubtract) % secondDividedNumber === 0)
          "
        />
      </section>
    </ResultLayout>
  </main>
</template>
