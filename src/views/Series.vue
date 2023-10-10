<script lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import moment from "moment";
import { findSeriesQuery } from "../queries/series";

import Episodes from "../components/Series/Episodes.vue";
import Info from "../components/Series/Info.vue";
import Video from "../components/Series/Video.vue";
import Loading from "../components/Loading.vue";
import ShareModal from "../components/Series/ShareModal.vue";
// import { ISeries } from "../types/series";

export default {
  data() {
    return {
      series: {} as any,
      currentEpisode: {} as any,
      loading: false,
      isModal: false,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchSeries();
      },
      { immediate: true }
    );
  },
  setup() {
    const route = useRoute();
    const title: any = route.params.title;
    const ep = route.query.ep;

    return {
      title,
      ep,
    };
  },
  methods: {
    fetchSeries: function () {
      const { onResult, loading } = useQuery(
        findSeriesQuery(
          [
            "images { \n source \n type \n }",
            "_id",
            "description",
            "title",
            "type",
            "view",
            "total_episodes",
            "status",
            "episodes { \n _id \n source \n epNum \n title \n created_at \n }",
            "genres { \n _id \n name \n}",
          ],
          this.title
        )
      );
      this.loading = loading.value;
      console.log(loading.value);
      onResult((result) => {
        if (result.data) {
          this.loading = loading.value;

          this.series = result.data.findSeries[0];
          this.currentEpisode = this.series?.episodes.find(
            (episode: any) => episode?.epNum.toString() === this.ep
          );
        }
      });
    },
    getCurrentDate: function (dateNum: number): string {
      return moment(dateNum).fromNow();
    },
    toggleShareModal: function () {
      const dialog: any = document.querySelector("dialog");
      dialog.showModal();
    },
  },
  components: { Episodes, Info, Video, Loading, ShareModal },
};
</script>

<template>
  <ShareModal />
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <section v-else class="text-white space-y-5 px-8 pt-5 md:flex md:gap-x-16">
    <section class="md:w-4/6 space-y-5">
      <header class="space-y-4">
        <h2>{{ `Episode: ${ep} - ${currentEpisode.title}` }}</h2>
        <div class="flex flex-row justify-between items-center">
          <p class="italic">
            {{ `Uploaded on: ${getCurrentDate(currentEpisode.created_at)}` }}
          </p>
          <div
            class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white font-bold"
            @click="toggleShareModal()"
          >
            Share
          </div>
        </div>
      </header>
      <main class="w-full" aria-label="main">
        <section aria-label="details-film" class="flex flex-col gap-y-6">
          <aside aria-label="video" class="text-white">
            <section v-if="ep && series?.episodes">
              <Video :source="currentEpisode.source || ``" />
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
                :to="`/series/${title}?ep=${episode.epNum + 1}`"
                :class="
                  episode.epNum.toString() === ep
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
              :view="series?.view"
            ></Info>
          </aside>
        </section>
      </main>
    </section>
    <section aria-label="trending" class="md:w-2/6">
      <h2 class="lg:text-3xl text-3xl mb-5 font-bold">Top Trending</h2>
    </section>
  </section>
</template>