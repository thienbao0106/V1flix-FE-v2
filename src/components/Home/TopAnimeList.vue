<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { seriesQuery } from "../../queries/series";
import TopAnimeCard from "../TopAnimeCard.vue";
import TopAnimeCardLoading from "../Loading/SkeletonLoading/TopAnimeCardLoading.vue";
export default {
  data() {
    return {
      mostWatchedSeries: [] as any[],
      topRatedSeries: [] as any[],
      loading: true,
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
      if (result.data) {
        const listSeries = [...result.data.series.series];
        this.mostWatchedSeries = listSeries.sort(
          (a: any, b: any) => b.view - a.view
        );
        this.topRatedSeries = listSeries.sort(
          (a: any, b: any) => b.avg_score - a.avg_score
        );
        this.loading = false;
      }
    });
  },
  components: { TopAnimeCard, TopAnimeCardLoading },
};
</script>

<template>
  <h1 className="font-bold lg:text-2xl text-xl mb-3">Most Watched</h1>
  <div v-if="loading">
    <TopAnimeCardLoading
      :rank="index + 1"
      :key="index"
      v-for="index in Array(9).keys()"
    />
  </div>
  <aside v-else>
    <ul className="flex gap-3 flex-col" role="list">
      <li
        v-for="(s, index) in mostWatchedSeries"
        :key="s._id"
        class="list-none rounded-lg border-solid border-l-0 border-t-0 border-b-0 [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
      >
        <TopAnimeCard
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :totalEpisodes="s.total_episodes"
          :type="s.type"
          :rank="index + 1"
          :view="s.view"
        />
      </li>
    </ul>
  </aside>
  <h1 className="font-bold lg:text-2xl text-xl my-5">Top Rated</h1>
  <div v-if="loading">
    <TopAnimeCardLoading
      :rank="index + 1"
      :key="index"
      v-for="index in Array(9).keys()"
    />
  </div>

  <aside v-else>
    <ul className="flex gap-3 flex-col" role="list">
      <li
        v-for="(s, index) in topRatedSeries"
        :key="s._id + 1"
        class="list-none rounded-lg border-solid border-l-0 border-t-0 border-b-0 [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
      >
        <TopAnimeCard
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :totalEpisodes="s.total_episodes"
          :type="s.type"
          :rank="index + 1"
          :rating="s.avg_score"
        />
      </li>
    </ul>
  </aside>
</template>
