<script lang="ts">
import Loading from "../components/Loading.vue";
import { fetchSeries } from "../utils/handleSeries";
import { getImageType } from "../utils/handleImage";
import SeriesActions from "../components/DetailSeries/SeriesActions.vue";
import DetailHeader from "../components/DetailSeries/DetailHeader.vue";
import Overview from "../components/DetailSeries/Overview.vue";
import Trailer from "../components/DetailSeries/Trailer.vue";

export default {
  data() {
    return {
      series: {} as any,
      title: this.$route.params.title,
      loading: false,
      currentSection: "overview",
    };
  },
  methods: {
    getImageType,
    fetchSeries: function () {
      this.loading = true;

      const { onResult } = fetchSeries(this.title, "detail");
      onResult((result: any) => {
        if (!result.data) return;

        this.series = result.data.findSeries[0];
      });
      this.loading = false;
    },
    setSection: function (section: string) {
      this.currentSection = section;
    },
  },
  mounted() {
    this.fetchSeries();
  },

  components: { Loading, SeriesActions, DetailHeader, Overview, Trailer },
};
</script>

<template>
  <Loading v-if="loading" message="Getting info" />
  <main
    v-if="Object.keys(series).length > 0 && !loading"
    class="text-white lg:h-[100vh] h-[300vh]"
  >
    <div
      :style="{
        backgroundImage: `url(${getImageType(series.images, `banner`)})`,
      }"
      className="bg-center bg-no-repeat h-[20rem] w-full opacity-60 inset-0 relative"
    ></div>
    <div class="-mt-50 px-10 space-y-5 absolute h-screen">
      <div
        class="flex lg:flex-row flex-col lg:space-y-0 space-y-5 lg:justify-start justify-center lg:items-start items-center gap-x-4"
      >
        <div class="max-w-[15rem]">
          <img
            :src="getImageType(series.images, `cover`)"
            alt="avatar"
            class="rounded-lg lg:pb-0 pb-5"
          />
          <SeriesActions :title="series.title.main_title" />
        </div>
        <section
          class="flex flex-col space-y-4 lg:text-start text-center lg:w-fit w-full gap-y-4"
        >
          <DetailHeader
            :favors="series.favors"
            :title="series.title"
            :view="series.view"
          />
          <section class="space-y-3 w-full">
            <header
              class="flex flex-row lg:justify-start justify-between w-full gap-x-10"
            >
              <div>
                <h1
                  @click="setSection(`overview`)"
                  :class="
                    currentSection === 'overview'
                      ? 'text-secondColor'
                      : 'text-white'
                  "
                  class="font-bold text-xl cursor-pointer hover:text-secondColor"
                >
                  Overview
                </h1>
              </div>
              <div>
                <h1
                  @click="setSection(`trailer`)"
                  :class="
                    currentSection === 'trailer'
                      ? 'text-secondColor'
                      : 'text-white'
                  "
                  class="font-bold text-xl cursor-pointer hover:text-secondColor"
                >
                  Trailer
                </h1>
              </div>
            </header>
            <hr class="lg:max-w-[20rem] w-full" />
            <div>
              <Overview :series="series" v-if="currentSection === 'overview'" />
              <Trailer
                :trailer="series.trailer"
                v-if="currentSection === 'trailer'"
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  </main>
</template>