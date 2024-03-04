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
import { defaultImage } from "../utils/handleImage";

import { addViewMutation } from "../queries/series";
import Comments from "../components/Series/Comments.vue";
import WatchTogetherModal from "../components/Series/WatchTogetherModal.vue";

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
      width: window.innerWidth,
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

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    this.setSeconds();
    window.removeEventListener("resize", this.onResize);
  },

  setup() {
    const url = window.location.href;
    return {
      url,
    };
  },
  methods: {
    onResize: function () {
      this.width = window.innerWidth;
    },
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
            const image = this.series?.images.find(
              (image: any) => image.type === "cover"
            );
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
                  property: "og:image",
                  content: image?.source || defaultImage,
                },
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
                  content: this.currentEpisode.description,
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
    toggleWatchTogetherModal: function () {
      console.log(this.currentEpisode);
      const dialog: any = document.querySelector(`#watch-modal`);
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
    Comments,
    WatchTogetherModal,
  },
};
</script>

<template>
  <ShareModal :seconds="seconds" :timestamp="timestamp" />
  <WatchTogetherModal
    v-if="Object.keys(currentEpisode).length > 0"
    :episode-id="currentEpisode._id"
  />
  <ListModal
    v-if="Object.keys(series).length > 0"
    :series="series"
    :current-ep="getInfoUrl.ep"
    :reload="false"
  />

  <div
    class="text-4xl font-bold text-white h-screen"
    v-if="Object.keys(series).length === 0"
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
              class="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start sm:gap-y-0 gap-y-4 md:text-lg text-md"
            >
              <div class="flex flex-row justify-center items-center gap-x-4">
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
              <div
                class="flex justify-center items-center gap-x-4 xl:text-lg text-sm"
              >
                <div
                  class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white font-bold"
                  @click="toggleWatchTogetherModal"
                >
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-tv" />
                  Watch Together
                </div>
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

          <aside
            :class="
              isTheaterMode
                ? `flex xl:flex-row flex-col justify-start items-start h-fit gap-x-8 `
                : `flex-none w-full`
            "
            aria-label="info-film"
          >
            <div
              class="space-y-5"
              :class="isTheaterMode ? `xl:w-4/6 :w-full` : `w-full`"
            >
              <Info
                :epDescription="currentEpisode.description"
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
              <Comments
                v-if="width >= 1280"
                :list-comments="currentEpisode.comments"
                :episode-id="currentEpisode._id"
              />
            </div>
            <section
              v-if="isTheaterMode"
              aria-label="trending"
              class="xl:w-2/6 w-full space-y-6 xl:mt-0 mt-5"
            >
              <div class="bg-opacityText px-2 py-4 rounded-lg">
                <h2 class="font-bold lg:text-2xl text-xl mb-5 px-2">
                  List Episodes
                </h2>
                <Episodes
                  :episodes="series?.episodes"
                  :current-info="getInfoUrl"
                />
              </div>
              <div class="p-2">
                <TopAnimeList />
              </div>
            </section>
          </aside>
        </section>
      </main>
    </section>

    <section
      v-if="!isTheaterMode"
      aria-label="trending"
      class="xl:w-2/6 w-full py-0 space-y-6"
    >
      <div class="bg-opacityText px-2 py-4 my-0 rounded-lg w-full">
        <h2 class="font-bold lg:text-2xl text-xl mb-5 px-2">List Episodes</h2>
        <Episodes :episodes="series?.episodes" :current-info="getInfoUrl" />
      </div>
      <div class="p-2 w-full">
        <TopAnimeList />
      </div>
      <Comments
        :episode-id="currentEpisode._id"
        v-if="width < 1280"
        :list-comments="currentEpisode.comments"
      />
    </section>
  </section>
  <main class="text-white" v-if="!loading && Object.keys(error).length > 0">
    <Error message="Can't find the series" />
  </main>
</template>
