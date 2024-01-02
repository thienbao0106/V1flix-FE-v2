<script lang="ts">
import { getImageType } from "../utils/handleImage";
import Details from "./Details.vue";

export default {
  props: [
    "id",
    "title",
    "status",
    "view",
    "images",
    "rank",
    "type",
    "totalEpisodes",
  ],
  methods: {
    getImageType,
  },
  components: { Details },
};
</script>

<template>
  <div className="flex flex-row w-full h-auto gap-3 bg-mainColor bg-opacity-50">
    <div
      className="xl:basis-[20%] lg:basis-[10%] basis-[20%] flex justify-center items-center"
    >
      <span
        :class="
          parseInt(rank) === 1
            ? 'first'
            : parseInt(rank) === 2
            ? 'second'
            : parseInt(rank) === 3
            ? 'third'
            : 'other'
        "
        class="text-7xl text-opacityText font-extrabold"
      >
        {{ rank }}
      </span>
    </div>
    <div className=" xl:basis-1/5 md:basis-[10%] sm:basis-[15%] basis-1/5 ">
      <img
        loading="lazy"
        class="xl:w-full xl:h-full md:h-[8rem] sm:h-[8rem] sm:w-fit h-full w-full"
        :src="getImageType(images, `cover`)"
        alt="placeholder-img"
      />
    </div>
    <div
      className="flex flex-col lg:basis-[80%]  md:basis-[70%] sm:basis-[65%] basis-3/5   my-auto space-y-3 py-1.5 pr-2"
    >
      <h3
        className="xl:text-base lg:text-xl sm:text-lg pt-2 text-lg font-semibold line-clamp-1"
      >
        <router-link
          :to="`/series/${title.main_title}?ep=1`"
          class="decoration-none text-white hover:text-secondColorBrighter"
        >
          {{ title.main_title }}
        </router-link>
      </h3>
      <div
        className="flex flex-row items-start justify-between pr-5 py-0.5 mb-3 rounded-b-md"
      >
        <Details :type="type" :newep="totalEpisodes" :status="status" />
      </div>
      <div
        class="w-fit flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2 mb-5"
      >
        <font-awesome-icon
          icon="fa-solid fa-eye"
          size="1x"
          class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
        />
        <span class="lg:text-base md:text-md text-lg">{{ view }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first {
  text-shadow: 1px 0 #8789c0, -1px 0 #8789c0, 0 1px #8789c0, 0 -1px #8789c0;
}
.second {
  text-shadow: 1px 0 #5dfdcb, -1px 0 #5dfdcb, 0 1px #5dfdcb, 0 -1px #5dfdcb;
}
.third {
  text-shadow: 1px 0 #7cc6fe, -1px 0 #7cc6fe, 0 1px #7cc6fe, 0 -1px #7cc6fe;
}
.other {
  text-shadow: 1px 0 #c2cae8, -1px 0 #c2cae8, 0 1px #c2cae8, 0 -1px #c2cae8;
}
</style>
