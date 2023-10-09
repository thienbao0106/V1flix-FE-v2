<script lang="ts">
export default {
  props: [
    "images",
    "id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",
    "genres",
  ],
  data() {
    return {
      width: window.innerWidth,
      isSeeMore: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    getCoverImage: function (images: any[]): string {
      if (!images) return "";
      return images.find((image) => image.type === "cover").source;
    },
    onResize: function () {
      this.width = window.innerWidth;
    },
    toggleSeeMore: function (seeMore: boolean) {
      this.isSeeMore = !seeMore;
    },
  },
};
</script>

<template>
  <main
    class="flex md:flex-row flex-col w-full gap-x-4 bg-opacityText py-4 md:px-0 rounded-lg"
  >
    <section aria-label="image" class="basis-1/5 xl:pl-4 md:px-0 px-4">
      <img
        :src="getCoverImage(images)"
        :alt="`img-${id}`"
        class="w-full md:h-full h-[200px] object-cover"
      />
    </section>
    <section
      aria-label="content"
      class="basis-4/5 space-y-4 h-full xl:mt-0 mt-5 xl:pr-4 md:px-0 px-4"
    >
      <div class="flex justify-between">
        <h3 class="lg:text-4xl text-xl font-bold">{{ title }}</h3>
      </div>
      <h4 class="font-extralight">{{ title }}</h4>
      <p
        class="font-light lg:text-xl text-sm w-full xl:line-clamp-none"
        :class="!isSeeMore && `line-clamp-2`"
      >
        {{ description }}
      </p>

      <div
        v-if="width < 1280"
        class="flex sm:justify-start sm:items-start justify-center items-center"
      >
        <div
          class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white"
          @click="toggleSeeMore(isSeeMore)"
        >
          {{ isSeeMore ? "See Less" : "See More" }}
        </div>
      </div>

      <div class="lg:text-base text-sm">
        <ul
          class="grid sm:grid-cols-2 grid-cols-1 lg:gap-y-2 gap-y-0.5 list-none"
        >
          <li>
            Type:
            <span class="text-secondColor ml-3 font-bold">{{ type }}</span>
          </li>
          <li>
            View:
            <span class="text-secondColor ml-3 font-bold">{{ view }}</span>
          </li>
          <li>
            Episodes:
            <span class="text-secondColor ml-3 font-bold">
              {{ total_episodes }}
            </span>
          </li>
          <li>
            Genres:
            <span v-for="(g, index) in genres">
              <router-link
                class="text-secondColor hover:text-secondColorBrighter decoration-none ml-3 font-bold"
                :to="`/genres/${g.name}`"
              >
                {{ `${g.name} ${index === genres.length ? "," : ""} ` }}
              </router-link>
            </span>
          </li>
          <li>
            Status:
            <span class="text-secondColor ml-3 font-bold">
              {{ status }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
