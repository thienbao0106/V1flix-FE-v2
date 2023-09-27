<script lang="ts">
import Details from "./Details.vue";

export default {
  props: ["id", "title", "images", "type", "total_episodes", "status"],
  methods: {
    getCoverImage: function (images: any[]): string {
      return images.find((image) => image.type === "cover").source;
    },
  },
  components: { Details },
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative group">
      <a href="/">
        <img :src="getCoverImage(images)" :alt="`cover-image-${title}`" />
      </a>
    </div>
    <div
      class="absolute top-1/2 lg:left-1/3 md:left-1/4 sm:left-[4.5rem] left-[75px] group-hover:translate-x-4 group-hover:duration-1000 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
    >
      <i class="pi pi-play" />
    </div>
    <div
      class="flex flex-row items-center justify-between bg-mainColor px-2 py-0.5 mb-3 rounded-b-md"
    >
      <Details :newep="total_episodes" :type="type" :status="status" />
    </div>
    <h3 class="lg:text-xl text-lg w-full line-clamp-2">{{ title }}</h3>
  </div>
</template>
