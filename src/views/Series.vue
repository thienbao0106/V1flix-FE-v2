<script lang="ts">
import moment from "moment";
import { useHead } from "@unhead/vue";
import { useMutation } from "@vue/apollo-composable";

import Episodes from "../components/Series/Episodes.vue";
import Info from "../components/Series/Info.vue";
import Video from "../components/Series/Video.vue";
import Loading from "../components/Loading.vue";
import ShareModal from "../components/Series/ShareModal.vue";
import TopAnimeList from "../components/Home/TopAnimeList.vue";
import VideoMobile from "../components/Series/VideoMobile.vue";

import { fetchSeries } from "../../utils/handleSeries";
import { addViewMutation } from "../queries/series";
import { defaultImage } from "../../utils/handleImage";
import { isIOS } from "../../utils/handleVersion";

export default {
  data() {
    return {
      series: {} as any,
      currentEpisode: {} as any,
      loading: false,
      isModal: false,
      timestamp: "00:00",
      seconds: 0,
      isTheaterMode: false,
      isIOS: null as any,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchSeries();
        this.getInfoUrl;
      },
      { immediate: true }
    );
  },
  computed: {
    getInfoUrl: function () {
      const { ep, t: time } = this.$route.query;
      const { title } = this.$route.params;
      return { ep, time, title };
    },
  },
  mounted() {
    this.handleIOS();
  },
  setup() {
    const url = window.location.href;

    return {
      url,
    };
  },
  methods: {
    handleIOS: function () {
      console.log(isIOS());
      this.isIOS = isIOS();
    },
    fetchSeries: function () {
      const { onResult, loading } = fetchSeries(this.getInfoUrl.title, "video");
      this.loading = loading.value;
      onResult((result) => {
        if (result.data) {
          //Update value
          this.loading = loading.value;
          this.series = result.data.findSeries[0];
          console.log(this.series);
          this.currentEpisode = this.series?.episodes.find(
            (episode: any) => episode?.epNum.toString() === this.getInfoUrl.ep
          );
          if (this.currentEpisode)
            this.addView(this.series._id, this.currentEpisode._id);
          const image = this.series?.images.find(
            (image: any) => image.type === "cover"
          );
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
                content: this.series?.description,
              },
            ],
          });
        }
      });
    },
    getCurrentDate: function (dateNum: number): string {
      return moment(dateNum).format("MMM Do YYYY");
    },
    setTheaterMode: function (isTheaterMode: boolean) {
      console.log(isTheaterMode);
      this.isTheaterMode = isTheaterMode;
    },

    toggleShareModal: function () {
      const video = document.querySelector("video");
      if (!video) return;
      const seconds = video.currentTime;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      this.seconds = seconds;
      this.timestamp = `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
      const dialog: any = document.querySelector("dialog");
      dialog.showModal();
    },
    addView: function (seriesId: string, episodeId: string) {
      const { mutate } = useMutation(addViewMutation);
      mutate({
        seriesId,
        episodeId,
      });
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
  },
};
</script>

<template>
  <ShareModal :seconds="seconds" :timestamp="timestamp" />
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <section
    id="main-video"
    v-else
    class="text-white space-y-5 px-8 pt-5 md:gap-x-16"
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
          <header class="space-y-2">
            <h2 class="lg:text-2xl text-base" v-if="currentEpisode">
              {{ `Episode ${getInfoUrl.ep} - ${currentEpisode?.title || ``}` }}
            </h2>
            <div
              v-if="currentEpisode"
              class="flex flex-row justify-between items-center"
            >
              <div
                class="text-lg flex flex-row justify-center items-center gap-x-5"
              >
                <p>
                  {{ `${currentEpisode?.view + 1 || 0} views` }}
                </p>
                <p v-if="currentEpisode?.created_at">
                  {{ ` ${getCurrentDate(currentEpisode?.created_at)} ` }}
                </p>
              </div>
              <div
                class="cursor-pointer bg-mainColor hover:bg-secondColor p-2.5 rounded-lg text-white font-bold"
                @click="toggleShareModal"
              >
                <font-awesome-icon class="mr-2" icon="fa-solid fa-share" />
                Share
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
            <div :class="isTheaterMode ? `xl:w-4/6 lg:w-full` : `w-full`">
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
              ></Info>
            </div>
            <section v-if="isTheaterMode" aria-label="trending" class="w-2/6">
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
      class="xl:w-2/6 sm:mt-0"
    >
      <h2 class="text-3xl mb-5 font-bold">Top Trending</h2>
      <TopAnimeList />
    </section>
  </section>
</template>
