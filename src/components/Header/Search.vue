<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { findSeriesQuery } from "../../queries/series";
import { VIDEO_QUERIES } from "../../constants/video";
import SearchCard from "./SearchCard.vue";

export default {
  data() {
    return {
      keyword: "",
      loading: false,
      resultQuery: [] as any,
      isDropdown: false,
    };
  },
  methods: {
    fetchResult: function () {
      this.loading = true;
      const { onResult } = useQuery(
        findSeriesQuery(VIDEO_QUERIES.headerSearch, this.keyword, 3)
      );
      onResult((result) => {
        if (!result.data) return;
        this.resultQuery = result.data.findSeries;
        this.isDropdown = true;
        this.loading = false;
      });
      return;
    },
    handleClick: function () {
      this.keyword = "";
    },
    toggleResult: function () {
      window.addEventListener("click", (e: any) => {
        const searchBox = document.querySelector("#search-area");
        if (!searchBox) return;
        this.isDropdown = searchBox.contains(e.target);
      });
    },
  },
  created() {
    this.$watch(
      () => this.keyword,
      () => {
        if (this.keyword === "") return;
        this.fetchResult();
      },
      { immediate: true }
    );
  },
  components: { SearchCard },
};
</script>

<template>
  <div @click="toggleResult" id="search-area" class="flex w-full">
    <div
      class="w-full flex justify-center items-center bg-gray-500 bg-opacity-40 px-2 py-4 rounded-md no-underline text-white gap-3"
    >
      <router-link
        to="/search"
        class="no-underline text-white hover:text-secondColorBrighter flex justify-between items-center"
      >
        <svg class="search-icon" viewBox="0 0 20 20">
          <path
            d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
          ></path>
        </svg>
      </router-link>
      <input
        type="text"
        class="2xl:w-full xl:w-[24rem] lg:w-[16rem] w-full bg-transparent px-2 focus:outline-none caret-transparent border-0 text-white placeholder:text-white placeholder:font-bold"
        placeholder="Search"
        v-model="keyword"
      />
    </div>
  </div>
  <div v-if="keyword !== '' && isDropdown" aria-label="result">
    <div
      className="bg-mainColor rounded-b-md text-center font-bold py-2 px-2 "
      v-if="loading"
    >
      Loading...
    </div>
    <ul v-else class="rounded-b-md list w-full">
      <li
        v-if="resultQuery.length > 0"
        v-for="film in resultQuery"
        :key="film._id"
        class="bg-mainColor hover:bg-gray-500 text-left py-2 pl-2 even:bg-black-500 list-none"
      >
        <a :href="`/series/${film.title.main_title}?ep=1`">
          <SearchCard
            :type="film.type"
            :duration="film.duration"
            :id="film._id"
            :images="film.images"
            :title="film.title"
            :view="film.view"
          />
        </a>
      </li>
      <li
        v-if="resultQuery.length === 3"
        className="bg-secondColor rounded-b-md text-center font-bold py-2 px-2 list-none"
      >
        <router-link
          @click="handleClick"
          class="text-white decoration-none"
          :to="`/search?keyword=${keyword}`"
        >
          See more
        </router-link>
      </li>
      <li
        v-if="keyword !== `` && resultQuery.length === 0 && !loading"
        className="bg-mainColor rounded-b-md text-center font-bold py-2 px-2 list-none"
      >
        Can't find the data with {{ keyword }}
      </li>
    </ul>
  </div>
</template>

<style scoped src="./header.css"></style>
