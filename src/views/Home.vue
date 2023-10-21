<script setup lang="ts">
import Banner from "../components/Home/Banner.vue";
import Recommendations from "../components/Home/Recommendations.vue";
import TopAnimeList from "../components/Home/TopAnimeList.vue";
import RandomSeries from "../components/Home/RandomSeries.vue";
</script>

<template>
  <main class="space-y-5">
    <section class="text-white">
      <Banner />
    </section>
    <section class="text-white">
      <RandomSeries />
    </section>
    <main
      className="bg-bgColor lg:px-9 px-4 py-2 flex xl:flex-row flex-col text-white"
    >
      <section className="basis-3/4 mt-5 lg:pr-10 pr-0">
        <h1 className="font-bold lg:text-2xl text-xl mb-5">Recommendations</h1>
        <Recommendations />
      </section>
      <section className="basis-1/4 lg:mt-5 mt-8">
        <h1 className="font-bold lg:text-2xl text-4xl mb-5">Top Anime</h1>
        <TopAnimeList />
      </section>
    </main>
  </main>
</template>
