<script lang="ts">
import ListGenres from "./ListGenres.vue";
import { capitalizeWord } from "../../utils/handleWord";
import { useQuery } from "@vue/apollo-composable";
import { randomSeriesQuery } from "../../queries/series";
export default {
  props: ["toggleSubNav", "listGenres"],
  data() {
    return {
      isGenresList: false,
      listSubMenu: ["series", "latest"],
      listSubMenuUser: ["users"],
    };
  },

  mounted() {
    const submenu: HTMLDivElement | null = document.querySelector("#sub-menu");
    const menu: HTMLDivElement | null = document.querySelector("#menu");
    const genres: HTMLDivElement | null = document.querySelector("#genres");

    if (!submenu || !menu || !genres) return;
    const body = document.body,
      html = document.documentElement;
    console.log(html.clientHeight);
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    submenu.style.height = `${height}px`;
    menu.style.height = `${height}px`;
    genres.style.height = `${height}px`;
  },
  methods: {
    capitalizeWord,
    toggleGenresList: function (isGenresList: boolean) {
      this.isGenresList = !isGenresList;
    },
    navigateRandom: function () {
      const { onResult: resultFn } = useQuery(
        randomSeriesQuery(["title \n { \n main_title \n } "])
      );
      resultFn((result) => {
        if (!result.data) return;
        const {
          title: { main_title },
        } = result.data.randomSeries;
        console.log(main_title);

        window.location.href = `/series/${main_title}?ep=1`;
      });
    },
    navigateHistory: function () {
      window.location.href = `/history`;
    },
  },
  components: { ListGenres },
};
</script>

<template>
  <section
    id="sub-menu"
    class="text-white absolute z-[1000] inset-0 opacity-100"
  >
    <div
      @click="toggleSubNav(true)"
      class="inset-0 absolute bg-mainColor -z-50 opacity-20"
    ></div>
    <div class="w-fit z-20 relative">
      <div
        id="menu"
        class="lg:w-[14rem] w-[11rem] bg-mainColor translate-x transition duration-1000 h-[6000px]"
      >
        <div class="sticky top-0 pt-5 bottom-0">
          <div class="text-3xl font-bold flex gap-x-5 pl-4">
            <svg
              class="cursor-pointer menu-burger-icon"
              @click="toggleSubNav(true)"
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
            <router-link
              to="/"
              @click="toggleSubNav(true)"
              class="hover:text-secondColorBrighter cursor-pointer decoration-none text-white"
            >
              Logo
            </router-link>
          </div>
          <div>
            <h1
              class="flex pl-4 space-y-4 pt-4 font-bold text-lg flex items-center gap-x-3"
            >
              <font-awesome-icon icon="fa-solid fa-tv" />
              Titles
            </h1>
            <ul class="list-none lg:pl-8 pl-4 space-y-4 pt-4 font-bold">
              <li v-for="section in listSubMenu">
                <router-link
                  :to="`/${section}`"
                  @click="toggleSubNav(true)"
                  class="hover:text-secondColorBrighter cursor-pointer decoration-none text-white"
                >
                  {{ capitalizeWord(section) }}
                </router-link>
              </li>

              <li
                @click="toggleGenresList(isGenresList)"
                class="hover:text-secondColorBrighter cursor-pointer"
              >
                Genres
              </li>
              <li
                @click="navigateHistory()"
                class="hover:text-secondColorBrighter cursor-pointer"
              >
                History
              </li>
              <li
                @click="navigateRandom()"
                class="hover:text-secondColorBrighter cursor-pointer"
              >
                Random
              </li>
            </ul>
          </div>
          <div>
            <h1
              class="flex pl-4 space-y-4 pt-4 font-bold text-lg flex items-center gap-x-3"
            >
              <font-awesome-icon icon="fa-solid fa-tv" />
              Community
            </h1>
            <ul class="list-none lg:pl-8 pl-4 space-y-4 pt-4 font-bold">
              <li v-for="section in listSubMenuUser">
                <router-link
                  :to="`/${section}`"
                  @click="toggleSubNav(true)"
                  class="hover:text-secondColorBrighter cursor-pointer decoration-none text-white"
                >
                  {{ capitalizeWord(section) }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="genres">
        <ListGenres
          v-if="isGenresList"
          :toggle-sub-nav="toggleSubNav"
          :toggle-genres-menu="toggleGenresList"
          :listGenres="listGenres"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-burger-icon {
  width: 2rem;
  height: 2rem;
}

.menu-burger-icon path,
.menu-burger-icon polygon,
.menu-burger-icon rect {
  fill: white;
}
</style>
