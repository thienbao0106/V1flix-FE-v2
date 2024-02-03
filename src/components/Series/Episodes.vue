<script lang="ts">
import { defaultImage } from "../../utils/handleImage";
export default {
  props: ["episodes", "currentInfo"],
  methods: {
    defaultImage,
  },
};
</script>

<template>
  <aside class="max-w-full lg:h-[500px] h-[300px] overflow-y-auto px-2">
    <ul
      v-if="episodes?.length > 0"
      className="flex lg:gap-x-5 gap-x-3 gap-y-3 max-w-full flex-col"
      role="list"
    >
      <a
        :href="`/watch/${currentInfo.title}?ep=${episode.epNum}`"
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
          <img
            class="rounded-md"
            :class="episode.thumbnail === '' ? 'w-[80px]' : 'w-[35%]'"
            :src="
              episode.thumbnail === ''
                ? defaultImage('thumbnail')
                : episode.thumbnail
            "
          />
          <div class="w-[65%] flex flex-col justify-between py-3">
            <div>
              <h1 class="font-bold">Episode: {{ episode.epNum }}</h1>
              <h2 class="lg:text-lg line-clamp-1 text-sm">
                {{ episode.title }}
              </h2>
            </div>
            <div>{{ episode.view }} views</div>
          </div>
        </div>
      </a>
    </ul>
    <div v-else>
      <h1 class="text-4xl font-extrabold">Coming soon</h1>
    </div>
  </aside>
</template>
