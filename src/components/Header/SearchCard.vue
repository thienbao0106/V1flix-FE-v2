<script lang="ts">
import { getImageType } from "../../utils/handleImage";
import { formatDuration } from "../../utils/handleSeries";

export default {
  props: ["id", "images", "duration", "view", "title", "type"],
  methods: {
    getImageType,
    formatDuration,
  },
};
</script>

<template>
  <div class="flex flex-row w-full gap-x-3">
    <div class="max-w-[60px]">
      <img
        :srcset="`thumbnail-${title.main_title}`"
        :src="getImageType(images, `thumbnail`)"
        class="rounded-md"
      />
    </div>
    <div class="flex flex-col gap-y-1">
      <h1 class="truncate line-clamp-1 font-bold">{{ title.main_title }}</h1>
      <h2 class="text-sm font-light">{{ type }}</h2>

      <div
        class="flex flex-row justify-start items-center gap-x-5 text-sm font-light justify-start items-center"
      >
        <div>
          <font-awesome-icon icon="fa-solid fa-eye" class="pr-0.5" />

          {{ view }}
        </div>
        <div>
          <font-awesome-icon icon="fa-regular fa-clock" class="pr-0.5" />
          {{ formatDuration(duration) }}
        </div>
      </div>
    </div>
  </div>
</template>
