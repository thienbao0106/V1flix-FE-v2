<script lang="ts">
import { getImageType } from "../../../utils/handleImage";
export default {
  props: ["images", "id", "title", "description"],

  methods: {
    getImageType,
  },
};
</script>

<template>
  <div
    class="lg:flex lg:flex-row-reverse xl:px-10 lg:px-5 lg:gap-x-5 px-4 flex-none lg:mb-20 mb-0"
  >
    <img
      :src="getImageType(images, `banner`)"
      alt="test"
      loading="lazy"
      class="lg:static absolute inset-0 lg:basis-1/2 lg:w-1/2 w-full lg:h-1/2 max-h-full lg:rounded-3xl lg:shadow-black lg:shadow-sm lg:opacity-100 opacity-60"
    />
    <aside
      class="lg:static lg:basis-1/2 xl:gap-8 lg:gap-4 lg:w-1/2 w-full relative lg:h-auto h-80 flex flex-col justify-center items-start gap-3"
    >
      <h1
        class="xl:text-5xl lg:text-3xl text-white text-2xl font-bold capitalize truncate w-full"
      >
        {{ title }}
      </h1>
      <p
        class="xl:text-2xl lg:text-md text-sm lg:w-full w-3/4 lg:line-clamp-3 text-white line-clamp-2 font-light lg:text-opacity-60 text-opacity-90"
      >
        {{ description }}
      </p>
      <a
        :href="`/series/${title}?ep=1`"
        class="decoration-none cursor-pointer bg-secondColor text-white hover:bg-opacity-70 xl:px-10 px-5 font-bold lg:py-4 py-2 xl:text-2xl lg:text-lg text-base rounded-md flex justify-center items-center gap-x-3"
      >
        <font-awesome-icon
          icon="fa-solid fa-play "
          size="1x"
          class="text-white"
        />
        PLAY NOW
      </a>
    </aside>
  </div>
</template>
