<script lang="ts">
import { useHead } from "@unhead/vue";

export default {
  props: ["episode", "roomId"],
  mounted() {
    useHead({
      title: this.episode.title,
      meta: [
        {
          property: "og:image",
          content: this.episode.thumbnail,
        },
        {
          property: "og:title",
          content: `${this.episode.title}`,
        },
        {
          property: "og:url",
          content: window.location.href,
        },
        {
          property: "og:description",
          content: this.episode.description,
        },
      ],
    });
  },
};
</script>

<template>
  <section class="w-full text-white rounded-lg bg-opacityText p-2 space-y-2">
    <h1>
      Room Id: <span class="font-bold">{{ roomId }}</span>
    </h1>
    <div class="flex xl:flex-row flex-col xl:gap-x-2 gap-y-2">
      <img class="rounded-lg h-fit" :src="episode.thumbnail" />
      <div>
        <h2 class="text-2xl font-bold">
          {{ episode.title }}
        </h2>
        <p class="xl:line-clamp-none line-clamp-4 text-md mb-2">
          {{ episode.description }}
        </p>
        <div>
          <span class="font-bold"> Subtitles: </span>
          {{ episode.subtitles.map((sub: any) => sub.label).join(", ") }}
        </div>
        <div>
          <span class="font-bold"> Ep Num: </span>
          {{ episode.epNum }}
        </div>
        <div>
          <span class="font-bold"> Series: </span>
          <router-link
            target="_blank"
            class="hover:text-secondColor"
            :to="`/series/${episode.series.title.main_title}`"
          >
            {{ episode.series.title.main_title }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
