<script lang="ts">
import Banner from "../components/Home/Banner.vue";
import Recommendations from "../components/Home/Recommendations.vue";
import TopAnimeList from "../components/Home/TopAnimeList.vue";
import RandomSeries from "../components/Home/RandomSeries.vue";
import Loading from "../components/Loading/Loading.vue";
import NewlyAdded from "../components/Home/NewlyAdded.vue";
import LatestEpisodes from "../components/Home/LatestEpisodes.vue";
import { HOVER_HOME } from "../constants/hover";
export default {
  data() {
    return {
      hoverPosition: HOVER_HOME,
    };
  },
  mounted() {
    window.localStorage.setItem("history", JSON.stringify([]));
  },
  setup() {
    document.title = "Home";
  },
  components: {
    Banner,
    Recommendations,
    TopAnimeList,
    RandomSeries,
    Loading,
    NewlyAdded,
    LatestEpisodes,
  },
};
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
      className="bg-bgColor xl:px-9 px-4 py-2 flex xl:flex-row flex-col text-white"
    >
      <section
        className="2xl:basis-3/4 basis-[65%] mt-5 xl:pr-10 pr-0 space-y-8"
      >
        <div>
          <h1 className="font-bold lg:text-2xl text-xl mb-5">
            Recommendations
          </h1>
          <Recommendations :hover-position="hoverPosition" />
        </div>
        <hr />
        <div>
          <div class="flex justify-between items-start flex-row">
            <h1 className="font-bold lg:text-2xl text-xl mb-5">Newly Added</h1>
            <router-link to="/series">
              <font-awesome-icon
                icon="fa-solid fa-arrow-right "
                size="xl"
                class="text-white hover:text-secondColor"
              />
            </router-link>
          </div>
          <NewlyAdded :hover-position="hoverPosition" />
        </div>
        <hr />

        <div>
          <div class="flex justify-between items-start flex-row">
            <h1 className="font-bold lg:text-2xl text-xl mb-5">
              Latest Episodes
            </h1>
            <router-link to="/latest">
              <font-awesome-icon
                icon="fa-solid fa-arrow-right "
                size="xl"
                class="text-white hover:text-secondColor"
              />
            </router-link>
          </div>
          <LatestEpisodes />
        </div>
      </section>
      <section className="2xl:basis-1/4 basis-[35%] lg:mt-5 mt-8">
        <TopAnimeList />
      </section>
    </main>
  </main>
</template>
