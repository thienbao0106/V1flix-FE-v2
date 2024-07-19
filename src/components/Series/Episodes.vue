<script lang="ts">
import { defaultImage, getImageType } from "../../utils/handleImage";
export default {
  props: ["episodes", "currentInfo", "seriesThumbnail"],
  methods: {
    defaultImage,
    getImageType,
  },
};
</script>

<template>
  <aside class="max-w-full xl:max-h-[500px] max-h-[700px] overflow-y-auto px-2">
    <ul
      v-if="episodes?.length > 0"
      className="flex lg:gap-x-5 gap-x-3 gap-y-3 max-w-full flex-col"
      role="list"
    >
      <router-link
        :to="`/watch/${currentInfo.title}?ep=${episode.epNum}`"
        :class="
          episode.epNum.toString() === currentInfo.ep
            ? `bg-secondColorBrighter`
            : `bg-mainColor`
        "
        class="decoration-none py-3 px-4 hover:cursor-pointer hover:bg-gray-400 rounded-md"
        v-for="(episode, index) in episodes"
        :key="index"
      >
        <div class="flex flex-row gap-x-3">
          <div
            v-if="episode.thumbnail === '' || !episode.thumbnail"
            class="rounded-md lg:w-[35%] w-[45%] h-[106px] bg-center bg-no-repeat"
            :style="{
              backgroundImage: `url(${getImageType(seriesThumbnail, 'cover')})`,
            }"
          ></div>
          <img
            v-else
            class="rounded-md lg:w-[35%] w-[45%] h-[106px]"
            :src="episode.thumbnail"
          />
          <div class="flex flex-col justify-between py-3 lg:w-[65%] w-full">
            <div>
              <h1
                class="font-bold sm:text-md md:text-lg lg:text-2xl xl:text-sm"
              >
                Episode: {{ episode.epNum }}
              </h1>
              <h2
                class="lg:line-clamp-2 md:line-clamp-3 line-clamp-2 xl:text-sm lg:text-2xl md:text-md sm:text-lg"
              >
                {{ episode.title }}
              </h2>
            </div>
            <div class="sm:text-md md:text-lg lg:text-2xl xl:text-sm">
              <span class="font-bold">{{ episode.view }}</span> views
            </div>
          </div>
        </div>
      </router-link>
    </ul>
    <div v-else>
      <h1 class="text-4xl font-extrabold">Coming soon</h1>
    </div>
  </aside>
</template>
