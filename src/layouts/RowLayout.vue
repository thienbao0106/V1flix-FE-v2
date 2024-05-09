<script lang="ts">
import RowItemCard from "../components/RowItemCard.vue";

export default {
  props: ["listSeries", "setSeries"],
  components: { RowItemCard },
};
</script>

<template>
  <div class="max-w-full lg:ml-8 ml-0 flex flex-col gap-y-4 lg:pr-8 pr-0">
    <div
      class="w-full flex flex-row bg-mainColor h-full justify-start items-center gap-x-3 py-4"
    >
      <div class="h-full xl:w-1/12 lg:w-2/12 md:w-1/12 w-3/12"></div>
      <div class="xl:w-8/12 lg:w-6/12 md:w-5/12 w-4/12 text-left">
        <h1 class="font-bold">Title</h1>
      </div>
      <div class="w-2/12 text-center">
        <h1 class="font-bold">
          {{ listSeries[0].date ? "Episode" : "Progress" }}
        </h1>
      </div>
      <!-- <div class="w-2/12 text-center">
        <h1 class="font-bold">Score</h1>
      </div> -->
      <div class="w-4/12 flex justify-center">
        <h1 class="font-bold">
          {{ listSeries[0].date ? "Time" : "Type" }}
        </h1>
      </div>
    </div>
    <RowItemCard
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
</template>
