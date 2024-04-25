<script lang="ts">
import GridItemCard from "../components/GridItemCard.vue";

export default {
  props: ["listSeries", "setSeries"],
  setup(props) {
    console.log(props.listSeries[0].series.rating);
  },
  components: { GridItemCard },
};
</script>

<template>
  <div>
    <div
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full lg:pl-8 pl-0 lg:pr-8 pr-0 gap-x-5 gap-y-5"
    >
      <GridItemCard
        @click="setSeries(series)"
        v-for="({ series, currentEp, date }, index) in listSeries"
        :key="index"
        :id="series._id"
        :images="series.images"
        :status="series.status"
        :title="series.title"
        :total_episodes="series.total_episodes"
        :type="series?.type"
        :view="series.view"
        :current_episode="currentEp"
        :date="date || ``"
        :rating="series?.rating"
      />
    </div>
  </div>
</template>
