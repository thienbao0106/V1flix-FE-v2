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

import { fetchSeries } from "../../utils/handleSeries";
import { addViewMutation } from "../queries/series";

export default {
  data() {
    return {
      series: {} as any,
      currentEpisode: {} as any,
      loading: false,
      isModal: false,
      timestamp: "00:00",
      seconds: 0,
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
  setup() {
    const url = window.location.href;
    return {
      url,
    };
  },
  methods: {
    fetchSeries: function () {
      const { onResult, loading } = fetchSeries(this.getInfoUrl.title);
      this.loading = loading.value;
      onResult((result) => {
        if (result.data) {
          //Update value
          this.loading = loading.value;
          this.series = result.data.findSeries[0];
          this.currentEpisode = this.series?.episodes.find(
            (episode: any) => episode?.epNum.toString() === this.getInfoUrl.ep
          );

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
                content: image.source,
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
      return moment(dateNum).fromNow();
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
  },
};
</script>

<template>
  <ShareModal :seconds="seconds" :timestamp="timestamp" />
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <section v-else class="text-white space-y-5 px-8 pt-5 md:flex md:gap-x-16">
    <section class="md:w-4/6 space-y-5">
      <header class="space-y-4">
        <h2>
          {{ `Episode: ${getInfoUrl.ep} - ${currentEpisode.title || ``}` }}
        </h2>
        <div class="flex flex-row justify-between items-center">
          <div class="space-y-2 text-lg">
            <p>
              {{ `View: ${currentEpisode.view + 1}` }}
            </p>
            <p class="italic">
              {{ `Uploaded on: ${getCurrentDate(currentEpisode.created_at)} ` }}
            </p>
          </div>
          <div
            class="cursor-pointer bg-mainColor hover:bg-secondColor p-2.5 rounded-lg text-white font-bold"
            @click="toggleShareModal"
          >
            Share
          </div>
        </div>
      </header>
      <main class="w-full" aria-label="main">
        <section aria-label="details-film" class="flex flex-col gap-y-6">
          <aside aria-label="video" class="text-white">
            <section v-if="getInfoUrl.ep && series?.episodes">
              <Video
                :source="currentEpisode.source || ``"
                :time="getInfoUrl.time"
                :subtitles="currentEpisode.subtitles"
              />
            </section>
            <section v-else>
              <div>This episode doesn't exist</div>
            </section>
          </aside>
          <aside>
            <ul
              v-if="series?.episodes?.length > 0"
              className="flex lg:gap-x-5 gap-x-3 gap-y-3 "
              role="list"
            >
              <router-link
                :to="`/series/${getInfoUrl.title}?ep=${episode.epNum}`"
                :class="
                  episode.epNum.toString() === getInfoUrl.ep
                    ? `bg-secondColor`
                    : `bg-mainColor`
                "
                class="decoration-none py-3 px-4 even:bg-opacity-40 hover:cursor-pointer hover:bg-secondColorBrighter rounded-md"
                v-for="(episode, index) in series?.episodes"
                :key="index"
              >
                <Episodes :episode="episode" />
              </router-link>
            </ul>
            <div v-else>Coming soon</div>
          </aside>
          <aside className="w-full" aria-label="info-film">
            <Info
              :description="series?.description"
              :images="series?.images"
              :genres="series?.genres"
              :id="series?._id"
              :status="series?.status"
              :title="series?.title"
              :total_episodes="series?.total_episodes"
              :type="series?.type"
              :view="series?.view + 1"
            ></Info>
          </aside>
        </section>
      </main>
    </section>
    <section aria-label="trending" class="md:w-2/6">
      <h2 class="lg:text-3xl text-3xl mb-5 font-bold">Top Trending</h2>
      <TopAnimeList />
    </section>
  </section>
</template>
