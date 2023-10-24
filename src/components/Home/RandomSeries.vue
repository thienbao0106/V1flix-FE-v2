<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { randomSeriesQuery } from "../../queries/series";
import { getImageType } from "../../../utils/handleImage";
export default {
  data() {
    return {
      series: {} as any,
    };
  },
  setup() {
    const { onResult: resultFn } = useQuery(randomSeriesQuery);
    return {
      resultFn,
    };
  },
  mounted() {
    this.resultFn((result: any) => {
      if (result.data) {
        this.series = result.data.randomSeries;
        console.log(this.series);
      }
    });
  },
  methods: {
    getImageType,
  },
};
</script>

<template>
  <div class="xl:px-10 lg:px-5 px-4 space-y-3">
    <h1 class="text-center text-4xl">Series Of The Day</h1>
    <div class="relative group decoration-none">
      <a class="text-white" :href="`/series/${series.title}?ep=1`">
        <img
          class="w-full md:h-full h-[20rem] rounded-md group-hover:opacity-25"
          :src="getImageType(series.images, `banner`)"
          :alt="series._id"
        />

        <div
          class="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:duration-1000 top-0 md:h-full h-[20rem] w-full flex justify-center items-center flex-col"
        >
          <h2 class="lg:text-4xl md:text-2xl font-extrabold">
            {{ series.title }}
          </h2>
          <div class="lg:text-lg md:text-base">
            <label>Status: </label>
            <span class="font-bold text-green"> {{ series.status }}</span>
          </div>
          <div class="lg:text-lg md:text-base">
            <label>Total Episode: </label>
            <span class="font-bold"> {{ series.total_episodes }}</span>
          </div>
          <div class="lg:text-lg md:text-base">
            <label>Total View: </label>
            <span class="font-bold"> {{ series.view }}</span>
          </div>
          <div class="lg:text-lg md:text-base">
            <label>Type: </label>
            <span class="font-bold"> {{ series.type }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
