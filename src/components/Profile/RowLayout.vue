<script lang="ts">
import ProfileRow from "./ProfileRow.vue";

export default {
  props: ["listSeries", "setSeries"],
  components: { ProfileRow },
};
</script>

<template>
  <div class="w-full lg:ml-8 ml-0 flex flex-col gap-y-4 lg:pr-8 pr-0">
    <div
      class="w-full flex flex-row bg-mainColor h-full justify-start items-center gap-x-3 py-4"
    >
      <div class="h-full xl:w-1/12 lg:w-2/12 md:w-1/12 w-3/12"></div>
      <div class="xl:w-8/12 lg:w-6/12 md:w-5/12 w-4/12 text-left">
        <h1 class="font-bold">Title</h1>
      </div>
      <div class="w-2/12 text-left">
        <h1 class="font-bold">Progress</h1>
      </div>
      <div class="w-4/12 flex justify-center">
        <h1 class="font-bold">
          {{ listSeries[0].date ? "Time" : "Action" }}
        </h1>
      </div>
    </div>
    <ProfileRow
      @click="setSeries(series)"
      v-for="{ series, currentEp, date } in listSeries"
      :key="series._id"
      :id="series._id"
      :images="series.images"
      :status="series.status"
      :title="series.title"
      :total_episodes="series.total_episodes"
      :type="series.type"
      :view="series.view"
      :current_episode="currentEp"
      :date="date || ``"
    />
  </div>
</template>
