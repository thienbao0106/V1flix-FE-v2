<script lang="ts">
import ListGenres from "./ListGenres.vue";
export default {
  props: ["toggleSubNav"],
  data() {
    return {
      isGenresList: false,
      listGenres: [],
    };
  },

  mounted() {
    const submenu: HTMLDivElement | null = document.querySelector("#sub-menu");

    if (!submenu) return;
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
  },
  methods: {
    toggleGenresList: function (isGenresList: boolean) {
      this.isGenresList = !isGenresList;
    },
  },
  components: { ListGenres },
};
</script>

<template>
  <section
    id="sub-menu"
    class="text-white absolute z-[200] inset-0 opacity-100"
  >
    <div
      @click="toggleSubNav(true)"
      class="inset-0 absolute bg-mainColor -z-50 opacity-20"
    ></div>
    <div class="w-fit z-20 relative">
      <div
        id="menu"
        class="h-screen w-[14rem] bg-mainColor translate-x transition duration-1000"
      >
        <div class="sticky top-0 pt-5">
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
              class="hover:text-secondColorBrighter cursor-pointer decoration-none text-white"
            >
              Logo
            </router-link>
          </div>
          <ul class="list-none pl-4 space-y-4 pt-4 font-bold">
            <li
              @click="toggleGenresList(isGenresList)"
              class="hover:text-secondColorBrighter cursor-pointer"
            >
              Genres
            </li>
            <li>
              <router-link
                to="/latest"
                class="hover:text-secondColorBrighter cursor-pointer decoration-none text-white"
              >
                Latest
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <ListGenres
        v-if="isGenresList"
        :toggleGenresMenu="toggleGenresList"
        :listGenres="listGenres"
      />
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
