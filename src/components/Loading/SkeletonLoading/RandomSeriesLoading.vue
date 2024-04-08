<script lang="ts">
import { defaultImage } from "../../../utils/handleImage";

export default {
  data() {
    return {
      defaultBannerImg: defaultImage("banner"),
    };
  },
};
</script>

<template>
  <section>
    <div class="relative group decoration-none shadow animate-pulse">
      <img
        class="w-full xl:h-[20rem] h-[15rem] rounded-md group-hover:opacity-25"
        :src="defaultBannerImg"
        alt="random-banner-img"
      />
      <div
        class="xl:space-y-3 space-y-1 absolute opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 group-hover:duration-1000 top-0 md:h-full xl:h-[20rem] h-[15rem] w-full flex justify-center items-center flex-col"
      >
        <div
          class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[30rem]"
        ></div>

        <div class="flex flex-row justify-center items-center space-x-2">
          <label>Status: </label>
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[20rem]"
          ></div>
        </div>
        <div class="flex flex-row justify-center items-center space-x-2">
          <label>Total Episode: </label>
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[12rem]"
          ></div>
        </div>
        <div class="flex flex-row justify-center items-center space-x-2">
          <label>Total View: </label>
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[12rem]"
          ></div>
        </div>
        <div class="flex flex-row justify-center items-center space-x-2">
          <label>Type: </label>
          <div
            class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[15rem]"
          ></div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center flex-row items-center mt-5">
      <div
        class="xl:h-7 h-4 bg-gray-200 rounded-full dark:bg-gray-700 xl:w-120 w-[50rem]"
      ></div>
    </div>
  </section>
</template>
