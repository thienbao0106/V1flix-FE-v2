<script lang="ts">
import Details from "./Details.vue";

export default {
  props: ["id", "title", "status", "view", "images", "rank", "type"],
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
        :src="getCoverImage(images)"
        alt="placeholder-img"
      />
    </div>
    <div
      className="flex flex-col basis-3/5  w-full  my-auto space-y-3 xl:mx-0 lg:mx-2 md:mx-0 "
    >
      <h3
        className="xl:text-base lg:text-3xl sm:text-2xl pt-2 text-lg font-semibold line-clamp-1"
      >
        <router-link
          :to="`/series/${title}?ep=1`"
          class="decoration-none text-white hover:text-secondColorBrighter"
          >{{ title }}</router-link
        >
      </h3>
      <div
        className="flex flex-col items-start justify-between pr-5 py-0.5 mb-3 rounded-b-md"
      >
        <Details
          :type="type"
          :newep="8"
          :status="status"
          :view="view"
          :check="false"
        />
      </div>
      <div
        class="w-fit flex justify-start items-center gap-2 rounded-br-xl rounded-l-md rounded-t-md px-2"
      >
        <i class="pi pi-eye" />
        <span class="lg:text-base text-sm">{{ view }}</span>
      </div>
    </div>
  </div>
</template>
