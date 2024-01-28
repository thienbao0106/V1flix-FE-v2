<script lang="ts">
import moment from "moment";
import { getImageType } from "../../utils/handleImage";

export default {
  props: [
    "id",
    "images",
    "epNum",
    "epCreatedAt",
    "seriesTitle",
    "title",
    "view",
  ],

  methods: {
    getImageType,
    getDate: function (time: any) {
      return moment(time).fromNow();
    },
  },
};
</script>

<template>
  <router-link
    :to="`/watch/${seriesTitle.main_title}?ep=${epNum}`"
    class="bg-mainColor hover:bg-gray-500 hover:cursor-pointer p-2 gap-x-2"
  >
    <div class="flex flex-row py-2 px-1 gap-x-2">
      <div class="w-[15%]">
        <img class="w-full rounded" :src="getImageType(images, `cover`)" />
      </div>
      <div class="w-[85%] flex flex-col justify-between">
        <div class="line-clamp-1">
          <h1 class="line-clamp-1 font-bold">{{ seriesTitle.main_title }}</h1>
          {{ `Ep. ${epNum} - ${title}` }}
        </div>
        <div class="flex flex-row gap-x-5 justify-between items-center">
          <div>
            <font-awesome-icon icon="fa-solid fa-eye" class="pr-0.5" />
            {{ view }}
          </div>
          <div>
            <font-awesome-icon icon="fa-regular fa-clock" class="pr-0.5" />

            {{ getDate(epCreatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
