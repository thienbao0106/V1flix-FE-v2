<script lang="ts">
import Banner from "../components/Home/Banner.vue";
import Recommendations from "../components/Home/Recommendations.vue";
import TopAnimeList from "../components/Home/TopAnimeList.vue";
import RandomSeries from "../components/Home/RandomSeries.vue";
import Loading from "../components/Loading.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    setLoading: function (loading: boolean) {
      this.loading = loading;
    },
  },
  setup() {
    document.title = "Home";
  },
  components: { Banner, Recommendations, TopAnimeList, RandomSeries, Loading },
};
</script>

<template>
  <Loading v-if="loading" message="Getting data..." />
  <main class="space-y-5">
    <section class="text-white">
      <Banner :setLoading="setLoading" />
    </section>
    <!-- temp fix for loading-->
    <section v-if="!loading" class="text-white">
      <RandomSeries />
    </section>
    <main
      className="bg-bgColor lg:px-9 px-4 py-2 flex xl:flex-row flex-col text-white"
      v-if="!loading"
    >
      <section className="basis-3/4 mt-5 lg:pr-10 pr-0">
        <h1 className="font-bold lg:text-2xl text-xl mb-5">Recommendations</h1>
        <Recommendations />
      </section>
      <section className="basis-1/4 lg:mt-5 mt-8">
        <h1 className="font-bold lg:text-2xl text-xl mb-5">Top Anime</h1>
        <TopAnimeList />
      </section>
    </main>
  </main>
</template>
