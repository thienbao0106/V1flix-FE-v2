<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { randomSeriesQuery } from "../../queries/series";
import { getImageType } from "../../utils/handleImage";
import RandomSeriesLoading from "../Loading/SkeletonLoading/RandomSeriesLoading.vue";
export default {
  data() {
    return {
      series: {} as any,
      loading: true,
    };
  },
  mounted() {
    this.fetchRandomSeries();
  },
  methods: {
    getImageType,
    fetchRandomSeries: function () {
      const { onResult } = useQuery(
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
      onResult((result: any) => {
        if (result.data) {
          this.series = result.data.randomSeries;
        }
        this.loading = false;
      });
    },
  },
  components: { RandomSeriesLoading },
};
</script>

<template>
  <div class="xl:px-10 lg:px-5 px-4 space-y-3">
    <h1 class="text-center lg:text-4xl text-2xl font-extrabold">
      Series Of The Day
    </h1>
    <RandomSeriesLoading v-if="loading" />
    <section v-else>
      <div class="relative group decoration-none">
        <router-link
          class="text-white"
          :to="`/series/${
            Object.keys(series).length > 0 && series.title.main_title
          }`"
        >
          <img
            class="w-full xl:h-[20rem] h-[15rem] rounded-md group-hover:opacity-25"
            :src="getImageType(series.images, `banner`)"
            :alt="series._id"
          />

          <div
            class="xl:space-y-3 space-y-0 absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:duration-1000 top-0 md:h-full xl:h-[20rem] h-[15rem] w-full flex justify-center items-center flex-col"
          >
            <div class="lg:text-lg md:text-base">
              <span class="font-bold">
                {{ series.title?.alt_title || "" }}</span
              >
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
      <h2 class="lg:text-4xl md:text-2xl text-lg text-center mt-5">
        {{ series.title?.main_title || "" }}
      </h2>
    </section>
  </div>
</template>
