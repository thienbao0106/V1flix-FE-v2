<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { randomSeriesQuery } from "../../queries/series";
import { getImageType } from "../../utils/handleImage";
export default {
  data() {
    return {
      series: {} as any,
    };
  },
  setup() {
    const { onResult: resultFn } = useQuery(
      randomSeriesQuery([
        "_id",
        "title \n { \n main_title \n alt_title  \n } ",
        "status",
        "total_episodes",
        "type",
        "view",
        "images \n { \n _id \n source \n type \n } ",
      ])
    );
    return {
      resultFn,
    };
  },
  mounted() {
    this.resultFn((result: any) => {
      if (result.data) {
        this.series = result.data.randomSeries;
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
    <h1 class="text-center lg:text-4xl text-2xl font-extrabold">
      Series Of The Day
    </h1>
    <div class="relative group decoration-none">
      <router-link
        class="text-white"
        :to="`/series/${
          Object.keys(series).length > 0 && series.title.main_title
        }?ep=1`"
      >
        <img
          class="w-full md:h-full h-[10rem] rounded-md group-hover:opacity-25"
          :src="getImageType(series.images, `banner`)"
          :alt="series._id"
        />

        <div
          class="absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:duration-1000 top-0 md:h-full h-[10rem] w-full flex justify-center items-center flex-col"
        >
          <div class="lg:text-lg md:text-base">
            <span class="font-bold"> {{ series.title?.alt_title || "" }}</span>
          </div>
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
      </router-link>
    </div>
    <h2 class="lg:text-4xl md:text-2xl text-lg text-center">
      {{ series.title?.main_title || "" }}
    </h2>
  </div>
</template>
