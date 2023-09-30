<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { findSeriesQuery } from "../queries/series";

export default {
  data() {
    return {
      theme: "dark",
      keyword: "",
    };
  },
  methods: {
    toggleTheme: function (theme: String) {
      this.theme = theme === "dark" ? "light" : "dark";
      return;
    },
  },
  computed: {
    resultQuery(): any {
      if (this.keyword === "") return;
      const { result } = useQuery(findSeriesQuery(["title"], this.keyword));
      console.log(result.value.findSeries);
      if (result.value) return result.value.findSeries;
      return [];
    },
  },
};
</script>

<template>
  <nav
    class="max-w-screen sticky top-0 bg-bgColor bg-gradient-to-b from-black to-transparent z-20 flex items-center justify-center gap-5 text-white py-7 px-10"
  >
    <section class="flex-none w-1/6">Logo</section>
    <section class="flex-1 w-2/6">Genres</section>

    <section
      aria-label="search"
      class="flex flex-row w-3/6 h-12 text-white gap-10"
    >
      <aside aria-label="input" class="w-4/6 flex flex-col">
        <div class="flex w-full">
          <div
            class="flex justify-center items-center bg-gray-500 bg-opacity-40 px-2 py-4 rounded-md no-underline text-white gap-3"
          >
            <a
              href="/search"
              class="no-underline text-white hover:text-secondColorBrighter flex justify-between items-center"
            >
              <span class="pi pi-search"></span>
            </a>
            <input
              type="text"
              class="2xl:w-[33rem] xl:w-[24rem] lg:w-[16rem] w-full bg-transparent px-2 focus:outline-none caret-transparent border-0 text-white placeholder:text-white placeholder:font-bold"
              placeholder="Search"
              v-model="keyword"
            />
          </div>
        </div>
        <div v-if="keyword !== ''" aria-label="result">
          <ul className="rounded-b-md list w-full">
            <li
              v-if="resultQuery.length > 0"
              v-for="film in resultQuery"
              className="bg-mainColor text-left py-2 pl-2 even:bg-black-500 text-white list-none"
            >
              {{ film.title }}
            </li>
            <li
              v-if="resultQuery.length === 3"
              className="bg-secondColor rounded-b-md text-center font-bold py-2 px-2 list-none"
            >
              See more
            </li>
            <li
              v-if="resultQuery.length === 0"
              className="bg-mainColor rounded-b-md text-center font-bold py-2 px-2 list-none"
            >
              Can't find the data with {{ keyword }}
            </li>
          </ul>
        </div>
      </aside>
      <div class="w-1/6 flex flex-1 justify-center items-center">
        <i
          @click="toggleTheme(theme)"
          class="pi text-2xl cursor-pointer hover:text-secondColorBrighter"
          :class="theme === 'dark' ? 'pi-sun' : 'pi-moon'"
        ></i>
      </div>
      <a
        href="/login"
        class="w-1/6 flex-1 flex justify-center items-center bg-transparent outline outline-offset-2 outline-outColor text-white py-2 rounded-lg px-2 w-full no-underline"
      >
        Login
      </a>
    </section>
  </nav>
</template>
