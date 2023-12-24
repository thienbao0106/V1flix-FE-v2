<script lang="ts">
import { getImageType } from "../../../utils/handleImage";
import { formatDuration } from "../../../utils/handleSeries";

export default {
  props: [
    "images",
    "id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",
    "genres",
    "duration",
  ],
  data() {
    return {
      width: window.innerWidth,
      isSeeMore: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    getImageType,
    formatDuration,
    onResize: function () {
      this.width = window.innerWidth;
    },
    toggleSeeMore: function (seeMore: boolean) {
      this.isSeeMore = !seeMore;
    },
  },
};
</script>

<template>
  <main
    id="info-main"
    class="flex md:flex-row flex-col w-full gap-x-4 bg-opacityText py-4 md:px-0 rounded-lg"
  >
    <section aria-label="image" class="basis-1/5 xl:pl-4 md:px-0 px-4">
      <img
        :src="getImageType(images, `cover`)"
        :alt="`img-${id}`"
        class="w-full md:h-full h-[200px] object-cover"
      />
    </section>
    <section
      aria-label="content"
      class="basis-4/5 space-y-4 h-full xl:mt-0 mt-5 xl:pr-4 md:px-0 px-4"
    >
      <div class="flex justify-between">
        <h3 class="lg:text-4xl md:text-2xl sm:text-xl font-bold">
          {{ title }}
        </h3>
      </div>
      <h4 class="font-extralight">{{ title }}</h4>
      <p
        class="font-light lg:text-xl text-sm w-full xl:line-clamp-none"
        :class="!isSeeMore && `line-clamp-2`"
      >
        {{ description }}
      </p>

      <div v-if="width < 1280" class="flex justify-start items-start">
        <div
          class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white"
          @click="toggleSeeMore(isSeeMore)"
        >
          {{ isSeeMore ? "See Less" : "See More" }}
        </div>
      </div>

      <div class="lg:text-base text-sm">
        <ul
          class="grid sm:grid-cols-2 grid-cols-1 lg:gap-y-2 gap-y-0.5 list-none"
        >
          <li>
            Type:
            <span class="text-secondColor ml-3 font-bold">{{ type }}</span>
          </li>
          <li>
            View:
            <span class="text-secondColor ml-3 font-bold">{{ view }}</span>
          </li>
          <li>
            Episodes:
            <span class="text-secondColor ml-3 font-bold">
              {{ total_episodes }}
            </span>
          </li>
          <li>
            Genres:
            <span v-for="(g, index) in genres">
              <a
                class="text-secondColor hover:text-secondColorBrighter decoration-none ml-3 font-bold"
                :href="`/genres/${g.name}`"
              >
                {{ `${g.name} ${index === genres.length ? "," : ""} ` }}
              </a>
            </span>
          </li>
          <li>
            Status:
            <span class="text-secondColor ml-3 font-bold">
              {{ status }}
            </span>
          </li>
          <li>
            {{ type === "TV" ? "Episode Duration: " : "Duration" }}
            <span class="text-secondColor ml-3 font-bold">
              {{ formatDuration(duration) }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
