<script lang="ts">
import moment from "moment";

import Details from "./Details.vue";
import { getImageType } from "../utils/handleImage";
import HoverCard from "./HoverCard.vue";
export default {
  props: [
    "id",
    "title",
    "images",
    "type",
    "total_episodes",
    "status",
    "view",
    "epNum",
    "epCreatedAt",
    "description",
    "trailer",
    "index",
    "condition",
    "hoverPosition",
  ],

  data(props) {
    console.log(props.condition);
    return {
      isNew: false,
      width: window.innerWidth,
    };
  },

  methods: {
    getImageType,
    checkNewEpisode: function (time: any) {
      const currentDay = moment();
      const filmDay = moment(time);
      const result: number = moment
        .duration(currentDay.diff(filmDay))
        .as("hours");

      return result < 24 ? true : false;
    },
    getDate: function (time: any) {
      return moment(time).fromNow();
    },
    onResize: function () {
      this.width = window.innerWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  components: { Details, HoverCard },
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative group">
      <HoverCard
        v-if="description && width >= 1280"
        :isEndOfRow="condition"
        :type="type"
        :totalEpisodes="total_episodes"
        :description="description"
        :trailer="trailer"
        :title="title"
        :hoverPosition="hoverPosition"
      />

      <div
        class="absolute bg-red-500 rounded-lg -top-3 -right-3 py-2 px-4 group-hover:hidden"
        v-if="checkNewEpisode(epCreatedAt) && epCreatedAt && epNum"
      >
        <span class="lg:text-base md:text-md text-lg font-bold text-lg"
          >New</span
        >
      </div>
      <router-link
        :to="
          epNum
            ? `/watch/${title.main_title}?ep=${epNum}`
            : `/series/${title.main_title}`
        "
      >
        <img
          class="group-hover:opacity-25 w-full"
          :src="getImageType(images, `cover`)"
          :alt="`cover-image-${title.main_title}`"
          loading="lazy"
        />

        <div
          class="absolute top-0 h-full w-full flex justify-center items-center group-hover:translate-x-1 group-hover:duration-1000 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
        >
          <font-awesome-icon
            icon="fa-solid fa-info-circle"
            size="4x"
            class="text-white"
          />
        </div>
      </router-link>
    </div>
    <div
      class="max-w-full flex flex-row items-center justify-between bg-mainColor px-2 py-0.5 mb-3 rounded-b-md"
    >
      <div
        class="flex flex-row items-center justify-between w-full"
        v-if="epNum"
      >
        <div
          class="gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2 max-w-1/2"
        >
          <div class="space-x-2 flex justify-center items-center">
            <font-awesome-icon
              icon="fa-solid fa-tv"
              size="1x"
              class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
            />
            <span class="lg:text-base md:text-md text-lg">{{ epNum }}</span>
          </div>
        </div>
        <div
          class="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2 max-w-1/2"
        >
          <font-awesome-icon
            icon="fa-regular fa-calendar"
            size="1x"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
          <span class="lg:text-base md:text-md text-lg line-clamp-1">{{
            getDate(epCreatedAt)
          }}</span>
        </div>
      </div>

      <Details
        v-else
        :newep="total_episodes"
        :type="type"
        :status="status"
        :view="view"
      />
    </div>
    <h3 class="lg:text-xl text-lg w-full line-clamp-2">
      {{ title.main_title }}
    </h3>
  </div>
</template>
