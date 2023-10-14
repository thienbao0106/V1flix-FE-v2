<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { getGenres } from "../queries/genres";
import { findSeriesQuery } from "../queries/series";
import ListResult from "../components/Search/ListResult.vue";
import TopAnime from "../components/Search/TopAnime.vue";

export default {
  setup() {
    const route = useRoute();
    const { keyword } = route.query;

    return {
      keyword: keyword || "",
    };
  },
  methods: {
    fetchGenres: function () {
      console.log("test");
      const { onResult } = useQuery(getGenres);
      onResult((result) => {
        if (result.data) this.genresFilter = result.data.genres;
      });
    },
    fetchResults: function () {
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
            "episodes { \n _id \n source \n epNum \n title \n created_at \n }",
            "genres { \n _id \n name \n}",
          ],
          this.keyword
        )
      );
      onResult((result) => {
        if (result.data) {
          this.result = result.data.findSeries;
        }
      });
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchGenres();
        this.fetchResults();
      },

      { immediate: true }
    );
  },
  data() {
    return {
      statusValue: "default",
      genresValue: "default",
      result: [],
      css: "bg-opacity-40 bg-gray-500 p-2 rounded-md lg:w-fit focus:outline-none focus:bg-gray-700 text-white",
      statusFilter: [
        {
          id: "completed",
          name: "completed",
        },
        {
          id: "releasing",
          name: "releasing",
        },
      ],
      genresFilter: [] as any,
    };
  },
  components: { ListResult, TopAnime },
};
</script>

<template>
  <main className="xl:px-8 px-4 text-white xl:flex xl:flex-row lg:space-y-8">
    <section aria-label="result-query" className="xl:basis-3/4 space-y-5 pr-8">
      <h1 className="text-3xl font-bold">{{ `Result for ${keyword}` }}</h1>

      <form>
        <aside
          aria-label="query"
          class="w-full flex lg:flex-row flex-col gap-2"
        >
          <input
            placeholder="Type your filter"
            :class="css"
            type="text"
            v-model="keyword"
          />
          <div className="lg:flex-none flex gap-2">
            <select v-model="statusValue" :class="css">
              <option value="default" hidden selected>Select status</option>
              <option :value="status.id" v-for="status in statusFilter">
                {{ status.name }}
              </option>
            </select>
            <select v-model="genresValue" :class="css">
              <option value="default" hidden selected>Select genres</option>
              <option :value="g._id" v-for="g in genresFilter">
                {{ g.name }}
              </option>
            </select>
          </div>
          <input
            type="submit"
            class="bg-secondColor p-2 rounded-md font-bold flex gap-2 cursor-pointer text-white"
            value="Submit"
          />
        </aside>
      </form>
      <aside aria-label="result">
        <ListResult :keyword="keyword" :results="result" />
      </aside>
    </section>
    <section
      aria-label="top-anime-query"
      className="lg:basis-1/4 space-y-4 lg:mt-0 mt-5"
    >
      <TopAnime :filter="keyword" :result="result" />
    </section>
  </main>
</template>
