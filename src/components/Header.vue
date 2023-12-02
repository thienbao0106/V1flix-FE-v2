<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { findSeriesQuery } from "../queries/series";
import SubNav from "./SubNav/SubNav.vue";

export default {
  data() {
    return {
      theme: "dark",
      keyword: "",
      isDropdown: false,
      loading: false,
      isSubNav: false,
      width: window.screen.width,
      timeOut: null,
      resultQuery: [] as any,
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
    onResize: function () {
      this.width = window.innerWidth;
    },
    toggleTheme: function (theme: string) {
      this.theme = theme === "dark" ? "light" : "dark";
      return;
    },
    toggleSubNav: function (isSubNav: boolean) {
      this.isSubNav = !isSubNav;
      if (this.isSubNav) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return;
    },
    toggleDropdown: function () {
      if (this.keyword === "") return;
      this.isDropdown = true;
    },
    handleQuery: function () {
      console.log("called");
      if (this.keyword === "") return;
      if (!this.isDropdown) this.isDropdown = true;
    },
    fetchResult: function () {
      this.loading = true;

      const { result } = useQuery(findSeriesQuery(["title"], this.keyword, 3));
      console.log("called");

      this.loading = false;
      this.resultQuery = result.value ? result.value.findSeries : [];
      return;
    },
  },

  created() {
    this.$watch(
      () => this.keyword,
      () => {
        if (this.keyword === "") return;
        console.log("called");
        this.fetchResult();
      },
      { immediate: true }
    );
  },
  components: { SubNav },
};
</script>

<template>
  <SubNav v-if="isSubNav" :toggle-sub-nav="toggleSubNav" />
  <nav
    class="z-[800] max-w-screen sticky top-0 bg-bgColor bg-gradient-to-b from-black to-transparent flex items-center justify-center gap-5 text-white py-7 px-10"
  >
    <div
      class="flex-none lg:w-3/6 w-2/6 flex gap-x-8 justify-start items-center"
    >
      <svg
        class="cursor-pointer menu-burger-icon wi"
        @click="toggleSubNav(isSubNav)"
        viewBox="0 0 20 20"
      >
        <path
          fill="none"
          d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
        ></path>
      </svg>

      <router-link to="/" class="w-fit text-white decoration-none"
        >Logo
      </router-link>
    </div>

    <section
      aria-label="search"
      class="flex flex-row lg:w-3/6 w-4/6 h-12 text-white lg:gap-0"
    >
      <aside v-if="width > 1280" aria-label="input" class="w-4/6 flex flex-col">
        <div class="flex w-full">
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
              @change="handleQuery"
            />
          </div>
        </div>
        <div v-if="keyword !== ''" aria-label="result">
          <div
            className="bg-mainColor rounded-b-md text-center font-bold py-2 px-2 "
            v-if="loading"
          >
            Loading...
          </div>
          <ul v-else class="rounded-b-md list w-full">
            <li
              v-if="resultQuery && resultQuery.length > 0"
              v-for="film in resultQuery"
              class="bg-mainColor text-left py-2 pl-2 even:bg-black-500 list-none"
            >
              <a
                class="text-white decoration-none hover:text-secondColorBrighter"
                :href="`/series/${film.title}?ep=1`"
              >
                {{ film.title }}
              </a>
            </li>
            <li
              v-if="resultQuery && resultQuery.length === 3"
              className="bg-secondColor rounded-b-md text-center font-bold py-2 px-2 list-none"
            >
              <router-link
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
      </aside>
      <aside
        v-else
        class="h-full flex flex-col justify-center items-center pt-1"
      >
        <router-link
          to="/search"
          class="no-underline text-white hover:text-secondColorBrighter"
        >
          <svg class="fill-white w-[2rem] h-[2rem]" viewBox="0 0 20 20">
            <path
              d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
            ></path>
          </svg>
        </router-link>
      </aside>
      <div
        class="w-2/6 flex lg:flex-1 justify-center items-center cursor-pointer text-white"
      >
        <svg
          v-if="theme === 'dark'"
          @click="toggleTheme(theme)"
          class="sun-icon w-full"
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            d="M5.114,5.726c0.169,0.168,0.442,0.168,0.611,0c0.168-0.169,0.168-0.442,0-0.61L3.893,3.282c-0.168-0.168-0.442-0.168-0.61,0c-0.169,0.169-0.169,0.442,0,0.611L5.114,5.726z M3.955,10c0-0.239-0.193-0.432-0.432-0.432H0.932C0.693,9.568,0.5,9.761,0.5,10s0.193,0.432,0.432,0.432h2.591C3.761,10.432,3.955,10.239,3.955,10 M10,3.955c0.238,0,0.432-0.193,0.432-0.432v-2.59C10.432,0.693,10.238,0.5,10,0.5S9.568,0.693,9.568,0.932v2.59C9.568,3.762,9.762,3.955,10,3.955 M14.886,5.726l1.832-1.833c0.169-0.168,0.169-0.442,0-0.611c-0.169-0.168-0.442-0.168-0.61,0l-1.833,1.833c-0.169,0.168-0.169,0.441,0,0.61C14.443,5.894,14.717,5.894,14.886,5.726 M5.114,14.274l-1.832,1.833c-0.169,0.168-0.169,0.441,0,0.61c0.168,0.169,0.442,0.169,0.61,0l1.833-1.832c0.168-0.169,0.168-0.442,0-0.611C5.557,14.106,5.283,14.106,5.114,14.274 M19.068,9.568h-2.591c-0.238,0-0.433,0.193-0.433,0.432s0.194,0.432,0.433,0.432h2.591c0.238,0,0.432-0.193,0.432-0.432S19.307,9.568,19.068,9.568 M14.886,14.274c-0.169-0.168-0.442-0.168-0.611,0c-0.169,0.169-0.169,0.442,0,0.611l1.833,1.832c0.168,0.169,0.441,0.169,0.61,0s0.169-0.442,0-0.61L14.886,14.274z M10,4.818c-2.861,0-5.182,2.32-5.182,5.182c0,2.862,2.321,5.182,5.182,5.182s5.182-2.319,5.182-5.182C15.182,7.139,12.861,4.818,10,4.818M10,14.318c-2.385,0-4.318-1.934-4.318-4.318c0-2.385,1.933-4.318,4.318-4.318c2.386,0,4.318,1.933,4.318,4.318C14.318,12.385,12.386,14.318,10,14.318 M10,16.045c-0.238,0-0.432,0.193-0.432,0.433v2.591c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.591C10.432,16.238,10.238,16.045,10,16.045"
          ></path>
        </svg>

        <svg
          v-else
          @click="toggleTheme(theme)"
          class="moon-icon"
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            d="M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"
          ></path>
        </svg>
      </div>
      <router-link
        to="/login"
        class="w-1/6 flex-1 flex justify-center items-center bg-transparent outline outline-offset-2 outline-outColor text-white py-2 rounded-lg px-2 w-full no-underline"
      >
        Login
      </router-link>
    </section>
  </nav>
</template>

<style src="./header.css" scoped></style>
