<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../../queries/episodes";
import Card from "../Card.vue";
import LatestEpCard from "./LatestEpCard.vue";

export default {
  data() {
    return {
      listEpisodes: [] as any,
    };
  },
  methods: {
    fetchEpisodes: function () {
      const { onResult } = useQuery(getEpisodes(0, 12));
      onResult((result) => {
        if (!result.data) return;
        this.listEpisodes = result.data.episodes.episodes;
      });
    },
  },
  mounted() {
    this.fetchEpisodes();
  },
  components: { Card, LatestEpCard },
};
</script>
<template>
  <div
    v-if="listEpisodes.length === 0"
    class="h-[200px] text-green-500 flex justify-center items-center w-full text-2xl font-bold"
  >
    <font-awesome-icon class="animate-spin" icon="fa-solid fa-spinner" />
  </div>
  <aside
    v-else
    class="grid 2xl:grid-rows-4 xl:grid-rows-6 lg:grid-rows-4 md:grid-rows-6 grid-rows-12 grid-flow-col gap-x-5"
  >
    <LatestEpCard
      v-for="ep in listEpisodes"
      :view="ep.view"
      :key="ep._id"
      :id="ep._id"
      :images="ep.series.images"
      :ep-num="ep.epNum"
      :ep-created-at="ep.created_at"
      :series-title="ep.series.title"
      :title="ep.title"
    />
  </aside>
</template>
