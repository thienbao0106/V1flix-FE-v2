<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import TopAnimeCard from "../TopAnimeCard.vue";

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
  components: { TopAnimeCard },
};
</script>

<template>
  <aside>
    <ul className="flex gap-3 flex-col" role="list">
      <li
        v-for="(s, index) in series"
        :key="s._id"
        className="list-none rounded-lg [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
      >
        <TopAnimeCard
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :total_episodes="s.total_episodes"
          :type="s.type"
          :rank="index + 1"
          :view="s.view"
        />
      </li>
    </ul>
  </aside>
</template>
