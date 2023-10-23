<script lang="ts">
import Details from "./Details.vue";

export default {
  props: ["id", "title", "images", "type", "total_episodes", "status", "view"],
  methods: {
    getCoverImage: function (images: any[]): string {
      const result = images.find((image) => image.type === "cover");
      return result.source;
    },
  },

  components: { Details },
};
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative group">
      <router-link :to="`/series/${title}?ep=1`">
        <img
          class="group-hover:opacity-25 max-w-full"
          :src="getCoverImage(images)"
          :alt="`cover-image-${title}`"
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
      </router-link>
    </div>
    <div
      class="max-w-full flex flex-row items-center justify-between bg-mainColor px-2 py-0.5 mb-3 rounded-b-md"
    >
      <Details
        :newep="total_episodes"
        :type="type"
        :status="status"
        :view="view"
        :check="true"
      />
    </div>
    <h3 class="lg:text-xl text-lg w-full line-clamp-2">{{ title }}</h3>
  </div>
</template>
