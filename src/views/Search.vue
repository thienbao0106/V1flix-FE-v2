<script lang="ts">
import { useQuery } from "@vue/apollo-composable";

import { getGenres } from "../queries/genres";
import { fetchSeries } from "../utils/handleSeries";
import ListResult from "../components/Search/ListResult.vue";
import TopAnime from "../components/Search/TopAnime.vue";
import Loading from "../components/Loading/Loading.vue";

export default {
  methods: {
    fetchGenres: function () {
      console.log("test");
      const { onResult } = useQuery(getGenres);
      onResult((result) => {
        if (result.data) {
          console.log(result.data.genres);
          this.genresFilter = result.data.genres;
        }
      });
    },
    fetchResults: function () {
      const { onResult, loading } = fetchSeries(
        this.keyword,
        "search",
        this.statusValue,
        this.genresValue
      );
      this.loading = loading.value;

      onResult((result) => {
        if (result.data) {
          console.log(loading.value);
          this.loading = loading.value;
          this.result = result.data.findSeries;
        }
      });
    },
    handleSubmit: function (e: any) {
      e.preventDefault();
      this.fetchResults();
      this.displayKeyword = this.keyword;
    },
    handleReset: function () {
      console.log("called");
      console.log(this.keyword);
      this.keyword = "";
      this.statusValue = "default";
      this.genresValue = "default";
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.keyword = this.$route.query.keyword || "";
        this.displayKeyword = this.$route.query.keyword || "";
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
          id: "Completed",
          name: "Completed",
        },
        {
          id: "Releasing",
          name: "Releasing",
        },
      ],
      genresFilter: [] as any,
      keyword: this.$route.query.keyword || "",
      displayKeyword: this.$route.query.keyword || "",

      loading: false,
    };
  },
  components: { ListResult, TopAnime, Loading },
};
</script>

<template>
  <main className="xl:px-8 px-4 text-white xl:flex xl:flex-row lg:space-y-8">
    <section aria-label="result-query" className="xl:basis-3/4 space-y-5 pr-8">
      <h1 className="text-3xl font-bold">
        {{
          `${displayKeyword === "" ? "Search" : `Result for ${displayKeyword}`}`
        }}
      </h1>

      <form method="post" @submit="handleSubmit">
        <aside
          aria-label="query"
          class="w-full flex lg:flex-row flex-col sm:gap-2 gap-3"
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
          <div class="w-full flex sm:justify-end justify-start gap-x-3">
            <button
              type="submit"
              class="bg-secondColor w-fit py-2 px-4 rounded-md font-bold flex sm:justify-start justify-center sm:items-start items-center gap-2 cursor-pointer text-white"
            >
              Submit
            </button>

            <button
              type="button"
              @click="handleReset()"
              class="bg-red-500 w-fit py-2 px-4 rounded-md font-bold flex sm:justify-start justify-center sm:items-start items-center gap-2 cursor-pointer text-white"
            >
              Reset
            </button>
          </div>
        </aside>
      </form>
      <Loading v-if="loading" message="Getting the data" />
      <aside v-else aria-label="result">
        <ListResult :keyword="keyword" :results="result" />
      </aside>
    </section>

    <section
      aria-label="top-anime-query"
      className="lg:basis-1/4 space-y-4 lg:mt-0 mt-5"
    >
      <TopAnime :filter="displayKeyword" :result="result" />
    </section>
  </main>
</template>
