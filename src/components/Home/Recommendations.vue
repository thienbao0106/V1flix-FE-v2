<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import Card from "../Card.vue";
import Loading from "../Loading.vue";

export default {
  data() {
    return {
      series: [] as any[],
      currentPage: 0,
      loading: false,
      firstLoading: false,
      width: window.innerWidth,
      numPerPage: 5,
    };
  },

  mounted() {
    this.fetchRecommendations();
  },
  components: { Card, Loading },
  methods: {
    fetchRecommendations: function () {
      this.firstLoading = true;
      const { onResult: resultFn } = useQuery(seriesQuery);
      resultFn((result) => {
        if (!result.data) return;

        this.series = [...result.data.series.series].sort(
          (firstSeries: any, nextSeries: any) =>
            nextSeries.avg_score - firstSeries.avg_score ||
            nextSeries.view - firstSeries.view
        );
      });
      this.firstLoading = false;
    },

    onResize: function () {
      this.width = window.innerWidth;
    },
  },
};
</script>

<template>
  <div
    v-if="series.length === 0"
    class="h-[200px] text-green-500 flex justify-center items-center w-full text-2xl font-bold"
  >
    <font-awesome-icon class="animate-spin" icon="fa-solid fa-spinner" />
  </div>
  <aside
    v-else
    class="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8"
  >
    <Card
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
      :trailer="s.trailer"
    />
  </aside>
</template>
