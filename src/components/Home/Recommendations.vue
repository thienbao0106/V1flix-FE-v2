<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import Card from "../Card.vue";

export default {
  data() {
    return {
      series: [] as any[],
    };
  },
  setup() {
    const { onResult: resultFn } = useQuery(seriesQuery(2));
    return {
      resultFn,
    };
  },
  mounted() {
    this.resultFn((result) => {
      if (result.data) this.series = result.data.series.series;
    });
  },
  components: { Card },
};
</script>

<template>
  <aside class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8">
    <Card
      v-for="s in series"
      :id="s._id"
      :images="s.images"
      :status="s.status"
      :title="s.title"
      :total_episodes="s.total_episodes"
      :type="s.type"
    />
  </aside>
  <aside class="flex justify-center items-center">
    <div
      class="bg-secondColor font-bold rounded-md py-2 px-5 mt-14 cursor-pointer"
    >
      See More
    </div>
  </aside>
</template>
