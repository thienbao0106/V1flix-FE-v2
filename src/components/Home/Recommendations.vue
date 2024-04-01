<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import Card from "../Card.vue";
import CardLoading from "../Loading/SkeletonLoading/CardLoading.vue";

export default {
  data() {
    return {
      series: [] as any[],
      currentPage: 0,
      loading: true,

      width: window.innerWidth,
      numPerPage: 5,
      dividedNumber: 0,
      secondDividedNumber: 0,
      indexCondition: 0,
      indexSubtract: 0,
    };
  },

  mounted() {
    this.fetchRecommendations();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      console.log(this.width);
    });
  },
  components: { Card, CardLoading },
  methods: {
    fetchRecommendations: function () {
      const { onResult: resultFn } = useQuery(seriesQuery);
      resultFn((result) => {
        if (!result.data) return;

        this.series = [...result.data.series.series].sort(
          (firstSeries: any, nextSeries: any) =>
            nextSeries.avg_score - firstSeries.avg_score ||
            nextSeries.view - firstSeries.view
        );
        this.loading = false;
      });
    },

    onResize: function () {
      this.width = window.innerWidth;
    },
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.$watch(
      () => this.width,
      () => {
        this.dividedNumber = this.width >= 1536 ? 5 : 4;

        this.secondDividedNumber = this.width >= 1536 ? 4 : 3;

        this.indexCondition = this.width >= 1536 ? 5 : 4;

        this.indexSubtract = this.width >= 1536 ? 4 : 6;
      },
      { immediate: true }
    );
  },
};
</script>

<template>
  <aside
    class="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8"
  >
    <CardLoading
      v-if="loading"
      :key="index"
      v-for="index in Array(10).keys()"
    />
    <Card
      v-else
      v-for="(s, index) in series"
      :index="index + 1"
      :id="s._id"
      :images="s.images"
      :status="s.status"
      :title="s.title"
      :total_episodes="s.total_episodes"
      :type="s.type"
      :view="s.view"
      :description="s.description"
      :condition="
        (index <= indexCondition && (index + 1) % dividedNumber === 0) ||
        (index <= indexCondition && (index + 1) % secondDividedNumber === 0) ||
        (index > indexCondition &&
          (index - indexSubtract - 1) % dividedNumber === 0) ||
        (index > indexCondition &&
          (index - indexSubtract) % secondDividedNumber === 0)
      "
      :trailer="s.trailer"
    />
  </aside>
</template>
