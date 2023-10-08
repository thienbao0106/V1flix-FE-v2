<script lang="ts">
import { useRoute } from "vue-router";
import { findSeriesQuery } from "../queries/series";
import { useQuery } from "@vue/apollo-composable";
import Episodes from "../components/Series/Episodes.vue";
import Info from "../components/Series/Info.vue";
import Video from "../components/Series/Video.vue";
// import { ISeries } from "../types/series";

export default {
  data() {
    return {
      series: {} as any,
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
    fetchSeries() {
      const { onResult } = useQuery(
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
            "episodes { \n _id \n source \n epNum \n }",
            "genres { \n _id \n name \n}",
          ],
          this.title
        )
      );
      onResult((result) => {
        console.log(result.data.findSeries[0].episodes);
        if (result.data) {
          this.series = result.data.findSeries[0];
          console.log(this.ep);
        }
      });
    },
  },
  components: { Episodes, Info, Video },
};
</script>

<template>
  <section class="text-white space-y-5 px-8 pt-5 md:flex md:gap-x-16">
    <section class="md:w-4/6 space-y-5">
      <header class="space-y-4">
        <h1 class="xl:text-4xl lg:text-2xl text-4xl font-bold">
          {{ series?.title }}
        </h1>
        <p>{{ `Episode: ${ep}` }}</p>
      </header>
      <main aria-label="main">
        <section aria-label="details-film" class="flex flex-col gap-y-6">
          <aside aria-label="video" class="text-white">
            <section v-if="ep && series?.episodes">
              <Video
                :source="series?.episodes.find((episode: any) => episode?.epNum.toString() === ep).source || ``"
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
