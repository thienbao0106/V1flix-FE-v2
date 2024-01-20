<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { findSeriesByIds } from "../queries/series";
//Layouts
import ResultLayout from "../layouts/ResultLayout.vue";
import GridLayout from "../layouts/GridLayout.vue";
import RowLayout from "../layouts/RowLayout.vue";

export default {
  data() {
    return {
      historyList: [] as any,
      loading: true,
      layout: "grid",
    };
  },
  methods: {
    setLayout: function (layout: string) {
      this.layout = layout;
    },
    showHistory: function () {
      const history = JSON.parse(window.localStorage.getItem("history") || "");
      console.log(history);
      if (history.length === 0) {
        return;
      }
      const historyIds = history.map((series: any) => series.seriesId);
      const dateWatches = history.map((series: any) => series.time);
      const currentEps = history.map((series: any) => series.currentEp);
      const { onResult } = useQuery(findSeriesByIds(historyIds));
      onResult((result) => {
        if (!result.data) return;
        this.historyList = result.data.findSeriesByIds.map(
          (series: any, index: number) => {
            return {
              series,
              currentEp: currentEps[index],
              date: dateWatches[index],
            };
          }
        );
      });
      this.loading = false;
    },
  },
  mounted() {
    this.showHistory();
  },
  components: { ResultLayout, GridLayout, RowLayout },
};
</script>

<template>
  <main class="space-y-5 text-white max-w-screen">
    <header class="lg:px-8 px-6 space-y-5">
      <h1 class="text-2xl font-bold">History</h1>
      <p class="bg-gray-800 font-bold py-3 text-center lg:px-0 px-2 rounded-md">
        Watching history is currently only tracked on your device, and will be
        lost if you log out or clear site data.
      </p>
    </header>
    <div class="flex justify-end items-center gap-x-3 lg:px-8 px-6">
      <button
        @click="setLayout('grid')"
        class="bg-mainColor px-4 py-2 rounded-md hover-bg-secondColor"
      >
        <font-awesome-icon icon="fa-solid fa-grip" class="text-white" />
      </button>
      <button
        @click="setLayout('row')"
        class="bg-mainColor px-4 py-2 rounded-md hover:bg-secondColor"
      >
        <font-awesome-icon icon="fa-solid fa-table" class="text-white" />
      </button>
    </div>
    <section class="w-full lg:px-0 px-6">
      <GridLayout
        v-if="historyList.length > 0 && layout === 'grid'"
        :list-series="historyList"
      />
      <RowLayout
        v-else-if="historyList.length > 0 && layout === 'row'"
        :list-series="historyList"
      />
    </section>
  </main>
</template>
