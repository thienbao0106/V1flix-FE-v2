<script lang="ts">
import moment from "moment";
import { defaultImage } from "../../utils/handleImage";
import { formatDuration, formatThumbnail } from "../../utils/handleSeries";

export default {
  props: ["episodes", "seriesTitle", "duration"],

  methods: {
    defaultImage,
    formatThumbnail,
    formatDuration,
    handleError: function (e: any) {
      console.log(e.target.src);
      e.target.src = defaultImage("banner");
    },
    formatDate: function (date: string) {
      return moment(date).fromNow();
    },
  },
  mounted() {
    // const lazyImages = document.querySelectorAll("img[loading='lazy']");
    // lazyImages.forEach(function (img: any) {
    //   img.src = img.dataset.src;
    // });
  },
};
</script>

<template>
  <div
    v-if="episodes.length > 0"
    class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4"
  >
    <div class="2xl:w-[500px] w-full space-y-2" v-for="ep in episodes">
      <router-link :to="`/watch/${seriesTitle}?ep=${ep.epNum}`">
        <div class="relative group">
          <img
            @error="handleError"
            loading="lazy"
            class="w-full h-[200px] group-hover:opacity-60 rounded-lg"
            :src="formatThumbnail(ep.source) || defaultImage(`banner`)"
          />
          <div
            class="absolute top-0 h-full w-full flex justify-center items-center group-hover:translate-x-1 group-hover:duration-1000 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
          >
            <font-awesome-icon
              icon="fa-solid fa-play "
              size="4x"
              class="text-white"
            />
          </div>
          <div
            class="absolute hidden group-hover:block bg-black bottom-2 right-3 px-2 py-1 text-sm rounded-md"
          >
            {{ formatDuration(duration) }}
          </div>
        </div>
      </router-link>
      <div class="text-start space-y-1">
        <h1 class="font-bold lg:line-clamp-1 line-clamp-3">
          Episode {{ ep.epNum }}:
          {{ ep.title }}
        </h1>
        <div class="text-sm flex justify-between items-center">
          <h1>{{ ep.view }} views</h1>
          <h1>{{ formatDate(ep.created_at) }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-xl text-start">
      This series doesn't have any episode yet.
    </h1>
  </div>
</template>
