<script lang="ts">
import { defaultImage } from "../../../utils/handleImage";
export default {
  methods: {
    defaultImage,
  },
};
</script>

<template>
  <div role="status" class="max-w-sm shadow animate-pulse">
    <img
      :src="defaultImage(`banner`)"
      alt="test"
      loading="lazy"
      class="relative w-full xl:h-[450px] md:h-[400px] h-[380px] opacity-20"
    />
    <aside
      class="absolute inset-0 h-full flex lg:flex-row flex-col gap-3 lg:px-10 px-5 py-10 lg:gap-x-5 w-full"
    >
      <svg
        class="lg:w-[20%] w-full lg:h-[370px] h-full text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path
          d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
        />
        <path
          d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
        />
      </svg>
      <div
        class="h-full flex flex-col lg:justify-between justify-start lg:items-start items-center lg:gap-y-0 gap-y-5 lg:w-[80%] w-full"
      >
        <div class="space-y-2 lg:w-[90%] w-full">
          <h1
            class="lg:text-3xl text-white text-xl font-bold w-full lg:text-start text-center line-clamp-1"
          >
            <div
              class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"
            ></div>
          </h1>
          <h2
            class="text-white text-md w-full flex flex-row justify-center lg:justify-start items-center lg:items-start"
          >
            <div
              class="lg:h-4 h-3 bg-gray-200 rounded-full dark:bg-gray-700 lg:w-96 w-48 mb-4"
            ></div>
          </h2>
          <div
            class="w-full lg:flex lg:flex-row lg:justify-start grid grid-cols-2 gap-2 pb-4"
          >
            <div
              class="bg-detail px-3 py-1 rounded-xl flex flex-row justify-center items-center h-fit py-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-star"
                class="pr-2 text-secondColor"
              />

              <div
                class="bg-gray-200 rounded-full flex flex-row justify-center items-center dark:bg-gray-700 w-32 h-6"
              ></div>
            </div>
            <div
              class="bg-detail px-3 py-1 rounded-xl flex flex-row justify-center items-center h-fit py-2"
            >
              <font-awesome-icon
                icon="fa-regular fa-calendar"
                class="pr-2 text-secondColor"
              />

              <div
                class="bg-gray-200 rounded-full flex flex-row justify-center items-center dark:bg-gray-700 w-32 h-6"
              ></div>
            </div>
            <div
              class="bg-detail px-3 py-1 rounded-xl flex flex-row justify-center items-center h-fit py-2"
            >
              <font-awesome-icon
                icon="fa-solid fa-tv"
                class="pr-2 text-secondColor"
              />

              <div
                class="bg-gray-200 rounded-full flex flex-row justify-center items-center dark:bg-gray-700 w-32 h-6"
              ></div>
            </div>
            <div
              class="bg-detail px-3 py-1 rounded-xl flex flex-row justify-center items-center h-fit py-2"
            >
              <font-awesome-icon
                icon="fa-regular fa-clock"
                class="pr-2 text-secondColor"
              />

              <div
                class="bg-gray-200 rounded-full flex flex-row justify-center items-center dark:bg-gray-700 w-32 h-6"
              ></div>
            </div>
          </div>
          <div class="xl:h-[80%] lg:h-[60%] w-full">
            <div
              class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 w-full"
            ></div>
            <div
              class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 w-full"
            ></div>
            <div
              class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 w-full"
            ></div>
            <div
              class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 w-full"
            ></div>
            <div
              class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 w-full"
            ></div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
