<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import Card from "../Card.vue";

export default {
  data() {
    return {
      series: [] as any[],
      currentPage: 0,
      loading: false,
    };
  },
  setup() {
    const numPerPage = 5;
    const { onResult: resultFn } = useQuery(seriesQuery(0, numPerPage));
    return {
      resultFn,
      numPerPage,
    };
  },
  mounted() {
    this.resultFn((result) => {
      if (result.data) this.series = result.data.series.series;
    });
  },
  components: { Card },
  methods: {
    seeMore: function () {
      const { onResult, loading } = useQuery(seriesQuery(1, this.numPerPage));
      this.loading = true;
      onResult((result) => {
        if (result.data)
          this.series = [...this.series, ...result.data.series.series];
        this.loading = loading.value;
      });
    },
  },
};
</script>

<template>
  <aside
    class="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8"
  >
    <Card
      v-for="s in series"
      :id="s._id"
      :images="s.images"
      :status="s.status"
      :title="s.title"
      :total_episodes="s.total_episodes"
      :type="s.type"
      :view="s.view"
    />
  </aside>
  <aside class="flex justify-center items-center">
    <div
      v-if="series.length <= numPerPage"
      @click="seeMore"
      class="bg-secondColor font-bold rounded-md py-2 px-5 mt-14 cursor-pointer"
    >
      {{ loading ? "Loading..." : "See More" }}
    </div>
  </aside>
</template>
