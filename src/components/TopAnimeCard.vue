<script lang="ts">
import { getImageType } from "../../utils/handleImage";
import Details from "./Details.vue";

export default {
  props: ["id", "title", "status", "view", "images", "rank", "type", "newep"],
  methods: {
    getImageType,
  },

  components: { Details },
};
</script>

<template>
  <div className="flex flex-row w-full h-auto gap-3 bg-mainColor bg-opacity-50">
    <div className="basis-1/5 flex justify-center items-center">
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
    <div className="basis-1/5">
      <img
        loading="lazy"
        class="h-full w-full"
        :src="getImageType(images, `cover`)"
        alt="placeholder-img"
      />
    </div>
    <div
      className="flex flex-col basis-3/5  w-full  my-auto space-y-3 xl:mx-0 lg:mx-2 md:mx-0 "
    >
      <h3
        className="xl:text-base lg:text-xl sm:text-lg pt-2 text-lg font-semibold line-clamp-1"
      >
        <a
          :href="`/series/${title}?ep=1`"
          class="decoration-none text-white hover:text-secondColorBrighter"
          >{{ title }}</a
        >
      </h3>
      <div
        className="flex flex-row items-start justify-between pr-5 py-0.5 mb-3 rounded-b-md"
      >
        <Details
          :type="type"
          :newep="newep"
          :status="status"
          :view="view"
          :check="false"
        />
      </div>
      <div
        class="w-fit flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
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
