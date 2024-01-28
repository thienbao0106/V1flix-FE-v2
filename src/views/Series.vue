<script lang="ts">
import moment from "moment";
import { useHead } from "@unhead/vue";
import { useMutation } from "@vue/apollo-composable";

import Episodes from "../components/Series/Episodes.vue";
import Info from "../components/Series/Info.vue";
import Video from "../components/Series/Video.vue";
import Loading from "../components/Loading.vue";
import ShareModal from "../components/Series/ShareModal.vue";
import ListModal from "../components/Modal/ListModal.vue";
import TopAnimeList from "../components/Home/TopAnimeList.vue";
import VideoMobile from "../components/Series/VideoMobile.vue";
import Error from "../components/Error.vue";

import { fetchSeriesByName, handleHistory } from "../utils/handleSeries";
import { isIOS } from "../utils/handleVersion";
import { convertToTimestamp, historyTimeline } from "../utils/video/handleTime";

import { addViewMutation } from "../queries/series";

export default {
  data() {
    return {
      series: {} as any,
      currentEpisode: {} as any,
      error: {} as any,
      loading: false,
      isModal: false,
      timestamp: "00:00",
      seconds: 0,
      isTheaterMode: false,
      isIOS: null as any,
      isUser: window.localStorage.getItem("username"),
      getInfoUrl: {
        ep: this.$route.query.ep,
        time: this.$route.query.t || 0,
        title: this.$route.params.title,
      } as any,
    };
  },
  created() {
    this.$watch(
      () => this.$route.fullPath,
      () => {
        this.setSeconds();
        this.getInfoUrl = {
          ep: this.$route.query.ep,
          time: this.$route.query.t,
          title: this.$route.params.title,
        };
        this.fetchSeries();
      },
      { immediate: true }
    );
    this.$watch(
      () => this.loading,
      () => {
        if (!window.localStorage.getItem("history")) return;
        const history = JSON.parse(
          window.localStorage.getItem("history") || ""
        );
        if (this.$route.query.t) return;
        const { title, ep } = this.getInfoUrl;
        this.getInfoUrl.time = historyTimeline(history, title, ep);
      }
    );
  },

  mounted() {
    this.handleIOS();
  },

  beforeUnmount() {
    this.setSeconds();
  },
  setup() {
    const url = window.location.href;
    return {
      url,
    };
  },
  methods: {
    handleIOS: function () {
      this.isIOS = isIOS();
    },
    fetchSeries: function () {
      try {
        console.log("called");
        this.loading = true;
        console.log(this.getInfoUrl.title);
        const { onResult, onError } = fetchSeriesByName(
          this.getInfoUrl.title,
          "video",
          false
        );
        onError((error) => {
          this.error = error;
          console.error(error);
        });
        onResult((result) => {
          if (result.data) {
            //Update value
            this.loading = false;
            if (!result.data.findSeriesByName) return;

            this.series = result.data.findSeriesByName;
            this.currentEpisode = this.series?.episodes.find(
              (episode: any) => episode?.epNum.toString() === this.getInfoUrl.ep
            );
            if (this.currentEpisode)
              this.addView(this.series._id, this.currentEpisode._id);

            if (window.localStorage.getItem("history") !== null) {
              const history = JSON.parse(
                window.localStorage.getItem("history") || ""
              );
              const newHistory = handleHistory(
                history,
                this.series._id,
                this.getInfoUrl.ep,
                this.getInfoUrl.title
              );
              window.localStorage.setItem(
                "history",
                JSON.stringify(newHistory)
              );
            }
            //Update head metadata
            useHead({
              title: `${this.getInfoUrl.title}`,
              meta: [
                {
                  property: "og:title",
                  content: `${this.getInfoUrl.title} - ${this.getInfoUrl.ep}`,
                },
                {
                  property: "og:url",
                  content: window.location.href,
                },
                {
                  property: "og:description",
                  content: this.series?.description,
                },
              ],
            });
          }
        });
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    getDate: function (dateNum: number): string {
      return moment(dateNum).format("MMM Do YYYY");
    },
    setTheaterMode: function (isTheaterMode: boolean) {
      console.log(isTheaterMode);
      this.isTheaterMode = isTheaterMode;
    },

    toggleShareModal: function () {
      const video = document.querySelector("video");
      if (!video) return;
      this.seconds = video.currentTime;
      this.timestamp = convertToTimestamp(video);
      const dialog: any = document.querySelector("#share-modal");

      if (!dialog) return;
      dialog.showModal();
    },
    toggleListModal: function () {
      const dialog: any = document.querySelector(`#add-modal`);
      if (!dialog) return;

      dialog.showModal();
    },
    addView: function (seriesId: string, episodeId: string) {
      const { mutate } = useMutation(addViewMutation);
      mutate({
        seriesId,
        episodeId,
      });
    },
    setSeconds: function () {
      if (!window.localStorage.getItem("history")) return;
      const video = document.querySelector("video");
      if (!video) return;
      const history = JSON.parse(window.localStorage.getItem("history") || "");
      const series: any = history[0];
      history.shift();
      series.seconds = video.currentTime;
      history.unshift(series);
      window.localStorage.setItem("history", JSON.stringify(history));
    },
  },

  components: {
    Episodes,
    Info,
    Video,
    Loading,
    ShareModal,
    TopAnimeList,
    VideoMobile,
    ListModal,
    Error,
  },
};
</script>

<template>
  <ShareModal :seconds="seconds" :timestamp="timestamp" />
  <ListModal
    v-if="Object.keys(series).length > 0"
    :series="series"
    :current-ep="getInfoUrl.ep"
    :reload="false"
  />
  <div
    class="text-4xl font-bold text-white"
    v-if="loading && Object.keys(series).length === 0"
  >
    <Loading message="Getting the data" />
  </div>
  <section
    id="main-video"
    v-if="!loading && Object.keys(series).length > 0"
    class="text-white space-y-5 px-8 md:gap-x-16"
    :class="isTheaterMode ? `lg:flex-none` : `xl:flex xl:flex-row lg:flex-none`"
  >
    <section
      id="main-left-section"
      class="space-y-5"
      :class="isTheaterMode ? `lg:w-full` : `xl:w-4/6 lg:w-full`"
    >
      <main class="w-full" aria-label="main">
        <section aria-label="details-film" class="flex flex-col gap-y-6">
          <aside aria-label="video" class="text-white">
            <section v-if="getInfoUrl.ep && series?.episodes">
              <div
                v-if="
                  series?.episodes.length === 0 ||
                  currentEpisode.source.length === 0
                "
              >
                This episode doesn't have a source yet.
              </div>
              <Video
                v-if="
                  currentEpisode && currentEpisode.source.length > 0 && !isIOS
                "
                :source="currentEpisode.source"
                :time="getInfoUrl.time"
                :subtitles="currentEpisode.subtitles"
                :set-theater-mode="setTheaterMode"
                :keyframe="currentEpisode.keyframe"
                :is-theater-mode="isTheaterMode"
                :title="currentEpisode.title"
                :ep-num="getInfoUrl.ep"
              />
              <VideoMobile
                v-if="
                  currentEpisode && currentEpisode.source.length > 0 && isIOS
                "
                :source="currentEpisode.source"
                :time="getInfoUrl.time"
                :subtitles="currentEpisode.subtitles"
              />
            </section>
            <section v-else>
              <div>This episode doesn't exist</div>
            </section>
          </aside>
          <header class="sm:space-y-2 space-y-5">
            <h2 class="text-2xl" v-if="currentEpisode">
              {{ `Episode ${getInfoUrl.ep} - ${currentEpisode?.title || ``}` }}
            </h2>

            <div
              v-if="currentEpisode"
              class="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start sm:gap-y-0 gap-y-4"
            >
              <div
                class="text-lg flex flex-row justify-center items-center gap-x-4"
              >
                <div
                  class="bg-mainColor rounded-md px-4 py-1.5 flex justify-center items-center"
                >
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-eye" />

                  <p>
                    {{ `${currentEpisode?.view + 1 || 0}` }}
                  </p>
                </div>
                <div class="bg-mainColor rounded-md px-4 py-1.5">
                  <p v-if="currentEpisode?.created_at">
                    {{ ` ${getDate(currentEpisode?.created_at)} ` }}
                  </p>
                </div>
              </div>
              <div class="flex justify-center items-center gap-x-4">
                <div
                  class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white font-bold"
                  @click="toggleShareModal"
                >
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-share" />
                  Share
                </div>
                <div
                  class="cursor-pointer bg-green-700 hover:bg-green-500 p-2.5 rounded-lg text-white font-bold"
                  v-if="isUser !== '' && isUser"
                  @click="toggleListModal"
                >
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-gear" />
                  Settings
                </div>
              </div>
            </div>
          </header>
          <aside class="max-w-full">
            <ul
              v-if="series?.episodes?.length > 0"
              className="flex lg:gap-x-5 gap-x-3 gap-y-3 max-w-full flex-wrap"
              role="list"
            >
              <router-link
                :to="`/series/${getInfoUrl.title}?ep=${episode.epNum}`"
                :class="
                  episode.epNum.toString() === getInfoUrl.ep
                    ? `bg-secondColorBrighter`
                    : `bg-mainColor`
                "
                class="decoration-none py-3 px-4 hover:cursor-pointer hover:bg-secondColorBrighter rounded-md"
                v-for="(episode, index) in series?.episodes"
                :key="index"
              >
                <Episodes :episode="episode" />
              </router-link>
            </ul>
            <div v-else>
              <h1 class="text-4xl font-extrabold">Coming soon</h1>
            </div>
          </aside>
          <aside
            :class="
              isTheaterMode
                ? `flex xl:flex-row flex-col justify-start items-start h-fit gap-x-8 `
                : `flex-none w-full`
            "
            aria-label="info-film"
          >
            <div :class="isTheaterMode ? `xl:w-4/6 :w-full` : `w-full`">
              <Info
                :description="series?.description"
                :images="series?.images"
                :genres="series?.genres"
                :id="series?._id"
                :status="series?.status"
                :title="series?.title"
                :total_episodes="series?.total_episodes"
                :type="series?.type"
                :view="series?.view"
                :duration="series?.duration"
                :is-user="isUser"
                :favors="series?.favors"
              ></Info>
            </div>
            <section
              v-if="isTheaterMode"
              aria-label="trending"
              class="xl:w-2/6 w-full"
            >
              <h2 class="text-3xl sm:mt-0 mt-5 mb-5 font-bold">Top Trending</h2>
              <TopAnimeList />
            </section>
          </aside>
        </section>
      </main>
    </section>

    <section
      v-if="!isTheaterMode"
      aria-label="trending"
      class="xl:w-2/6 w-full sm:mt-0"
    >
      <h2 class="text-3xl mb-5 font-bold">Top Trending</h2>
      <TopAnimeList />
    </section>
  </section>
  <main class="text-white" v-if="!loading && Object.keys(error).length > 0">
    <Error message="Can't find the series" />
  </main>
</template>
