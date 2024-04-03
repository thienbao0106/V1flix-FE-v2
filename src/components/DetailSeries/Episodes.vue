<script lang="ts">
import moment from "moment";
import { defaultImage } from "../../utils/handleImage";
import { formatDuration, formatThumbnail } from "../../utils/handleSeries";
import { checkWatchedEpisode } from "../../utils/handleEpisode";

export default {
  props: ["episodes", "seriesTitle", "duration", "history"],

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
  setup(props) {
    const watchedEpisode = props.history.filter(
      (series: any) => series.title === props.seriesTitle
    );
    const uniqueCurrentEps = new Set();
    const filtered = watchedEpisode.filter((item: any) => {
      if (uniqueCurrentEps.has(item.currentEp)) {
        // If the currentEp value is already encountered, return false to filter out the duplicate
        return false;
      } else {
        // Add the currentEp value to the Set to mark it as encountered
        uniqueCurrentEps.add(item.currentEp);
        // Return true to keep this item in the filtered array
        return true;
      }
    });
    console.log(filtered);

    const result = checkWatchedEpisode(filtered, props.episodes);

    return {
      result,
    };
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
    class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4"
  >
    <div
      class="2xl:max-w-[500px] w-full space-y-2"
      v-for="(ep, index) in episodes"
      :class="result[index] ? 'opacity-50' : 'opacity-100'"
    >
      <router-link :to="`/watch/${seriesTitle}?ep=${ep.epNum}`">
        <div class="relative group">
          <img
            @error="handleError"
            loading="lazy"
            class="w-full h-[200px] group-hover:opacity-60 rounded-lg"
            :src="
              ep.thumbnail !== ``
                ? ep.thumbnail
                : formatThumbnail(ep.source) || defaultImage(`banner`)
            "
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
            class="absolute bg-black bottom-2 right-3 px-2 py-1 text-sm rounded-md"
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
