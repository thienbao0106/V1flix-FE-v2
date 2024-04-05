<script lang="ts">
import { useHead } from "@unhead/vue";

import { fetchSeriesByName } from "../utils/handleSeries";
import { defaultImage, getImageType } from "../utils/handleImage";
import Loading from "../components/Loading/Loading.vue";
import SeriesActions from "../components/DetailSeries/SeriesActions.vue";
import DetailHeader from "../components/DetailSeries/DetailHeader.vue";
import Overview from "../components/DetailSeries/Overview.vue";
import Trailer from "../components/DetailSeries/Trailer.vue";
import Episodes from "../components/DetailSeries/Episodes.vue";
import Relations from "../components/DetailSeries/Relations.vue";
import ListModal from "../components/Modal/ListModal.vue";

export default {
  data() {
    return {
      series: {} as any,
      title: this.$route.params.title,
      loading: false,
      currentSection: "overview",
      history: JSON.parse(localStorage.getItem("history") || ""),
      userStatus: "",
    };
  },
  setup() {
    console.log(JSON.parse(localStorage.getItem("history") || ""));
  },
  methods: {
    getImageType,
    fetchSeries: function () {
      this.loading = true;
      const { onResult, onError } = fetchSeriesByName(
        this.title,
        "detail",
        true
      );
      onResult((result: any) => {
        if (!result.data) return;
        this.series = result.data.findSeriesByName;
        document.title = this.series.title.main_title;
        this.loading = false;
        useHead({
          title: this.series.title.main_title,
          meta: [
            {
              property: "og:image",
              content:
                getImageType(this.series.images, "cover") || defaultImage,
            },
            {
              property: "og:title",
              content: `${this.series.title.main_title}`,
            },
            {
              property: "og:url",
              content: window.location.href,
            },
            {
              property: "og:description",
              content: this.series.description,
            },
          ],
        });
      });
      onError((error) => {
        console.log(error);
      });
    },
    setSection: function (section: string) {
      this.currentSection = section;
    },
    setUserStatus: function (userStatus: string) {
      this.userStatus = userStatus;
      console.log(this.userStatus);
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
    Relations,
    ListModal,
  },
};
</script>

<template>
  <Loading v-if="loading" message="Getting info" />
  <ListModal
    v-if="Object.keys(series).length > 0"
    :series="series"
    :current-ep="1"
    :reload="true"
    :setUserStatus="setUserStatus"
  />
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
        <div class="2xl:max-w-[10%] max-w-[15rem]">
          <img
            :src="getImageType(series.images, `cover`)"
            alt="cover"
            class="rounded-lg lg:pb-0 pb-5 w-full"
          />
          <SeriesActions :title="series.title.main_title" />
        </div>
        <section
          class="2xl:w-[90%] w-full flex flex-col space-y-4 lg:text-start text-center lg:w-fit gap-y-4"
        >
          <DetailHeader
            :favors="series.favors"
            :title="series.title"
            :view="series.view"
            :genres="series.genres"
            :rating="series.avg_score"
            :userStatus="userStatus"
          />
          <section class="space-y-3 w-full lg:text-xl text-md">
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
                  class="font-bold cursor-pointer hover:text-secondColor"
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
                  class="font-bold cursor-pointer hover:text-secondColor"
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
                  class="font-bold cursor-pointer hover:text-secondColor"
                >
                  Episodes
                </h1>
              </div>
              <div>
                <h1
                  @click="setSection(`relations`)"
                  :class="
                    currentSection === 'relations'
                      ? 'text-secondColor'
                      : 'text-white'
                  "
                  class="font-bold cursor-pointer hover:text-secondColor"
                >
                  Relations
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
              <Relations
                :relations="series.relation"
                v-if="currentSection === 'relations'"
              />
              <Episodes
                v-if="currentSection === 'episodes'"
                :episodes="series.episodes"
                :seriesTitle="series.title.main_title"
                :duration="series.duration"
                :history="history === '' ? [] : history"
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  </main>
</template>
