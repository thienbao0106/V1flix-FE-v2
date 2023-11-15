<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { getGenres } from "../queries/genres";
import { fetchSeries } from "../../utils/handleSeries";
import ListResult from "../components/Search/ListResult.vue";
import TopAnime from "../components/Search/TopAnime.vue";
import Loading from "../components/Loading.vue";

export default {
  setup() {
    const route = useRoute();
    const { keyword } = route.query;

    return {
      keyword: keyword || "",
      loading: true,
    };
  },
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
          id: "Completed",
          name: "Completed",
        },
        {
          id: "Releasing",
          name: "Releasing",
        },
      ],
      genresFilter: [] as any,
    };
  },
  components: { ListResult, TopAnime, Loading },
};
</script>

<template>
  <main className="xl:px-8 px-4 text-white xl:flex xl:flex-row lg:space-y-8">
    <section aria-label="result-query" className="xl:basis-3/4 space-y-5 pr-8">
      <h1 className="text-3xl font-bold">{{ `Result for ${keyword}` }}</h1>

      <form method="post" @submit="handleSubmit">
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
      <Loading v-if="loading" message="Getting the data" />
      <aside v-else aria-label="result">
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
