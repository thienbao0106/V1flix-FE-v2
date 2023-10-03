<script lang="ts">
import { useRoute } from "vue-router";
import { findSeriesQuery } from "../queries/series";
import { useQuery } from "@vue/apollo-composable";
import Episodes from "../components/Series/Episodes.vue";
import Info from "../components/Series/Info.vue";
// import { ISeries } from "../types/series";

export default {
  data() {
    return {
      series: {} as any,
    };
  },
  setup() {
    const route = useRoute();
    const title: any = route.params.title;
    console.log(
      findSeriesQuery(
        [
          "title",
          "episodes { \n _id \n }",
          "images { \n source \n type \n }",
          "genres { \n _id name \n}",
        ],
        title
      )
    );
    const { onResult: resultFn } = useQuery(
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
          "episodes { \n _id \n }",
          "genres { \n _id \n name \n}",
        ],
        title
      )
    );
    return {
      resultFn,
      ep: route.query.ep,
      title: route.params.title,
    };
  },
  mounted() {
    this.resultFn((result) => {
      console.log(result.data.findSeries[0].genres);
      if (result.data) this.series = result.data.findSeries[0];
    });
  },
  components: { Episodes, Info },
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
            <section v-if="ep">
              <div>Test</div>
            </section>
            <section v-else>
              <div>This episode doesn't exist</div>
            </section>
          </aside>
          <aside>
            <Episodes :episodes="series?.episodes" />
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
