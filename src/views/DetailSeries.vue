<script lang="ts">
import Loading from "../components/Loading.vue";
import { fetchSeries } from "../utils/handleSeries";
import { getImageType } from "../utils/handleImage";
import SeriesActions from "../components/DetailSeries/SeriesActions.vue";
import DetailHeader from "../components/DetailSeries/DetailHeader.vue";
import Overview from "../components/DetailSeries/Overview.vue";
import Trailer from "../components/DetailSeries/Trailer.vue";
import Episodes from "../components/DetailSeries/Episodes.vue";

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

  components: {
    Loading,
    SeriesActions,
    DetailHeader,
    Overview,
    Trailer,
    Episodes,
  },
};
</script>

<template>
  <Loading v-if="loading" message="Getting info" />
  <main
    v-if="Object.keys(series).length > 0 && !loading"
    class="text-white h-full"
  >
    <div
      :style="{
        backgroundImage: `url(${getImageType(series.images, `banner`)})`,
        boxShadow: `inset 0 0 0 1000px rgba(0,0,0,.4)`,
      }"
      className="bg-center bg-no-repeat h-[20rem] w-full "
    ></div>
    <div class="-mt-50 px-10 space-y-5">
      <div
        class="w-full flex lg:flex-row flex-col lg:space-y-0 space-y-5 lg:justify-start justify-center lg:items-start items-center gap-x-4"
      >
        <div class="lg:max-w-[15%] max-w-[15rem]">
          <img
            :src="getImageType(series.images, `cover`)"
            alt="avatar"
            class="rounded-lg lg:pb-0 pb-5 w-full"
          />
          <SeriesActions :title="series.title.main_title" />
        </div>
        <section
          class="w-[85%] flex flex-col space-y-4 lg:text-start text-center lg:w-fit w-full gap-y-4"
        >
          <DetailHeader
            :favors="series.favors"
            :title="series.title"
            :view="series.view"
            :genres="series.genres"
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
              <div>
                <h1
                  @click="setSection(`episodes`)"
                  :class="
                    currentSection === 'episodes'
                      ? 'text-secondColor'
                      : 'text-white'
                  "
                  class="font-bold text-xl cursor-pointer hover:text-secondColor"
                >
                  Episodes
                </h1>
              </div>
            </header>
            <hr class="w-full" />
            <div>
              <Overview :series="series" v-if="currentSection === 'overview'" />
              <Trailer
                :trailer="series.trailer"
                v-if="currentSection === 'trailer'"
              />
              <Episodes
                v-if="currentSection === 'episodes'"
                :episodes="series.episodes"
                :seriesTitle="series.title.main_title"
                :duration="series.duration"
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  </main>
</template>
