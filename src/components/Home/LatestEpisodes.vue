<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getEpisodes } from "../../queries/episodes";
import Card from "../Card.vue";
import LatestEpCard from "./LatestEpCard.vue";
import LatestCardLoading from "../Loading/SkeletonLoading/LatestCardLoading.vue";
export default {
  data() {
    return {
      listEpisodes: [] as any,
      loading: true,
    };
  },
  methods: {
    fetchEpisodes: function () {
      const { onResult } = useQuery(getEpisodes(0, 12));
      onResult((result) => {
        if (!result.data) return;
        this.listEpisodes = result.data.episodes.episodes;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.fetchEpisodes();
  },
  components: { Card, LatestEpCard, LatestCardLoading },
};
</script>
<template>
  <aside
    class="grid 2xl:grid-rows-4 xl:grid-rows-6 lg:grid-rows-4 md:grid-rows-6 grid-rows-12 grid-flow-col gap-x-5"
  >
    <LatestCardLoading
      v-if="loading"
      :key="index"
      v-for="index in Array(12).keys()"
    />
    <LatestEpCard
      v-else
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
