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
        console.log(result.data.episodes);
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
  <aside
    class="grid lg:grid-rows-4 md:grid-rows-6 grid-rows-12 grid-flow-col gap-x-5"
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
    <!-- <Card
      v-for="ep in listEpisodes"
      :key="ep._id"
      :id="ep._id"
      :images="ep.series.images"
      :ep-num="ep.epNum"
      :ep-created-at="ep.created_at"
      :title="ep.series.title"
    /> -->
  </aside>
</template>
