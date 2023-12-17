<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { findSeriesByIds } from "../../queries/series";
export default {
  data() {
    return {
      isCollapse: window.innerWidth < 1024 ? false : true,
      keyword: "",
      historyList: [] as any,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    toggleList: function (isCollapse: boolean) {
      this.isCollapse = !isCollapse;
    },
    onResize: function () {
      if (window.innerWidth < 1024) return;
      if (this.isCollapse === false) this.isCollapse = true;
    },
    handleSearch: function () {
      if (this.historyList.length === 0 || this.userList.length === 0) return;
      if (this.currentType === "all") {
        this.setListSeries(
          this.userList.filter((item: any) =>
            item.series.title.toLowerCase().includes(this.keyword.toLowerCase())
          )
        );
        return;
      }

      if (this.currentType === "history") {
        this.setListSeries(
          this.historyList.filter((item: any) =>
            item.series.title.toLowerCase().includes(this.keyword.toLowerCase())
          )
        );
        return;
      }

      this.setListSeries(
        this.userList.filter((item: any) => {
          return (
            item.status === this.currentType.toLowerCase() &&
            item.series.title.toLowerCase().includes(this.keyword.toLowerCase())
          );
        })
      );
    },
    showHistory: function () {
      const history = JSON.parse(window.localStorage.getItem("history") || "");
      if (history.length === 0) {
        this.setListSeries([]);
        return;
      }
      const historyIds = history.map((series: any) => series.seriesId);
      const dateWatches = history.map((series: any) => series.time);
      const currentEps = history.map((series: any) => series.currentEp);

      const { onResult } = useQuery(findSeriesByIds(historyIds));
      onResult((result) => {
        if (!result.data) return;
        this.setCurrentType("history");
        this.historyList = result.data.findSeriesByIds.map(
          (series: any, index: number) => {
            return {
              series,
              currentEp: currentEps[index],
              date: dateWatches[index],
            };
          }
        );
        this.setListSeries(this.historyList);
      });
    },
  },
  props: [
    "count",
    "typeList",
    "setCurrentType",
    "setListSeries",
    "currentType",
    "userList",
  ],
};
</script>

<template>
  <section class="lg:w-1/5 w-full lg:mb-0 mb-5">
    <div class="w-full mb-5">
      <h1 class="font-bold text-xl my-1.5">Filters</h1>

      <input
        type="text"
        v-model="keyword"
        placeholder="Please input your search"
        @input="handleSearch"
        class="w-full text-white font-bold pl-2 py-2 rounded-md bg-mainColor"
      />
    </div>
    <div class="my-5">
      <h1
        @click="showHistory()"
        class="cursor-pointer hover:text-secondColor font-bold text-xl my-1.5"
      >
        Watching History
      </h1>
    </div>
    <div class="flex flex-row justify-between items-center w-full">
      <h1 class="font-bold text-xl">Lists</h1>
      <button
        @click="toggleList(isCollapse)"
        class="bg-mainColor lg:invisible visible text-white hover:bg-secondColor font-bold rounded-lg"
      >
        <font-awesome-icon
          v-if="!isCollapse"
          icon="fa-solid fa-arrow-down"
          class="px-3 py-1.5"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-arrow-up"
          class="px-3 py-1.5"
        />
      </button>
    </div>
    <ul v-if="isCollapse" class="pt-5">
      <li
        v-for="(type, index) in typeList"
        class="hover:bg-secondColor hover:cursor-pointer hover:font-bold py-3 px-3"
        @click="setCurrentType(type)"
      >
        <div class="flex flex-row justify-between items-center">
          <span>
            {{ type }}
          </span>
          <span> {{ count[index] }} </span>
        </div>
      </li>
    </ul>
  </section>
</template>
