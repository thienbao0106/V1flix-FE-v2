<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import Card from "../Card.vue";

export default {
  data() {
    return {
      series: [] as any,
    };
  },
  methods: {
    fetchSeries: function () {
      const { onResult } = useQuery(seriesQuery(0, 10));
      onResult((result: any) => {
        if (!result.data) return;
        console.log(result.data);
        this.series = result.data.series.series;
      });
    },
  },
  mounted() {
    this.fetchSeries();
  },
  components: { Card },
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
</template>
