<script lang="ts">
import { getImageType } from "../../utils/handleImage";
import { formatDuration } from "../../utils/handleSeries";
export default {
  props: ["images", "id", "title", "description", "season", "duration", "type"],
  data() {
    return {
      width: window.innerWidth,
    };
  },
  methods: {
    formatDuration,
    getImageType,
    onResize: function () {
      this.width = window.innerWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    const descriptionBox: any = document.querySelector(
      `#description-${this.id}`
    );
    descriptionBox.innerHTML = this.description;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<template>
  <div>
    <img
      :src="getImageType(images, `banner`)"
      alt="test"
      loading="lazy"
      class="relative w-full xl:h-[450px] md:h-[400px] h-[380px] opacity-20"
    />
    <aside
      class="absolute inset-0 h-full flex lg:flex-row flex-col gap-3 lg:px-10 px-5 py-10 lg:gap-x-5 w-full"
    >
      <img
        :src="getImageType(images, `cover`)"
        v-if="width >= 1024"
        alt="test"
        loading="lazy"
        class="rounded-lg"
      />
      <div
        class="h-full flex flex-col lg:justify-between justify-start lg:items-start items-center lg:gap-y-0 gap-y-5"
      >
        <div class="space-y-2">
          <h1
            class="lg:text-3xl text-white text-xl font-bold capitalize xl:truncate w-full lg:text-start text-center line-clamp-1"
          >
            {{ title.main_title }}
          </h1>
          <h2
            class="lg:text-lg text-white text-md xl:truncate w-full lg:text-start text-center"
          >
            {{ title.alt_title }}
          </h2>
          <div
            class="lg:text-lg text-white lg:text-md text-sm xl:truncate w-full lg:text-start text-center lg:flex lg:flex-row lg:justify-start grid grid-cols-2 gap-2"
          >
            <div class="bg-detail px-3 py-1.5 rounded-xl">
              <font-awesome-icon icon="fa-regular fa-calendar" class="pr-2" />

              {{ season }}
            </div>
            <div class="bg-detail px-3 py-1.5 rounded-xl">
              <font-awesome-icon icon="fa-solid fa-tv" class="pr-2" />

              {{ type }}
            </div>
            <div class="bg-detail px-3 py-1.5 rounded-xl">
              <div>
                <font-awesome-icon icon="fa-regular fa-clock" class="pr-2" />
                {{ formatDuration(duration) }}
              </div>
            </div>
          </div>
          <div class="xl:h-[80%] lg:h-[60%]">
            <p
              :id="`description-${id}`"
              class="lg:text-start text-center xl:text-lg lg:text-lg text-sm w-full text-white lg:line-clamp-0 line-clamp-3 text-opacity-90 lg:hover:overflow-y-auto h-full"
            ></p>
          </div>
        </div>
        <div class="flex flex-row gap-x-2">
          <a
            :href="`/watch/${title.main_title}?ep=1`"
            class="decoration-none cursor-pointer bg-secondColor text-white hover:bg-opacity-70 xl:px-7 px-5 font-bold lg:py-3 py-2 xl:text-2xl lg:text-lg text-base rounded-md flex justify-center items-center gap-x-3"
          >
            <font-awesome-icon
              icon="fa-solid fa-play "
              size="1x"
              class="text-white"
            />
            PLAY NOW
          </a>
          <a
            :href="`/series/${title.main_title}`"
            class="decoration-none cursor-pointer bg-gray text-white hover:bg-opacity-70 xl:px-7 px-5 font-bold lg:py-3 py-2 xl:text-2xl lg:text-lg text-base rounded-md flex justify-center items-center gap-x-3"
          >
            <font-awesome-icon
              icon="fa-solid fa-info-circle "
              size="1x"
              class="text-white"
            />
            DETAILS
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>
