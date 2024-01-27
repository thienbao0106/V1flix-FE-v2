<script lang="ts">
import { getImageType } from "../../utils/handleImage";

export default {
  props: ["relations"],
  methods: {
    getImageType,
  },
  setup(props) {
    console.log(props.relations);
  },
};
</script>
<template>
  <main
    class="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4 lg:mt-4 mt-7"
  >
    <a
      v-for="series in relations"
      class="flex flex-row bg-mainColor hover:opacity-70 rounded-md xl:w-[500px] lg:w-[450px] w-full"
      :href="`/series/${series.related_series.title.main_title}`"
    >
      <div>
        <img
          class="max-h-[10rem] rounded-md"
          :src="getImageType(series.related_series.images, 'thumbnail')"
        />
      </div>
      <div
        class="flex flex-col justify-between items-start pl-4 pt-3 pb-2 text-left"
      >
        <div>
          <h1 class="lg:text-xl text-lg text-secondColor font-bold">
            {{ series.role }}
          </h1>
          <h2 class="lg:text-2xl text-md">
            {{ series.related_series.title.main_title }}
          </h2>
        </div>
        <div class="text-md italic">
          {{ series.related_series.status }} -
          {{ series.related_series.total_episodes }} eps
        </div>
      </div>
    </a>
  </main>
</template>
