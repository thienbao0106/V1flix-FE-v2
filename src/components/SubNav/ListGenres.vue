<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getGenresMenu } from "../../queries/genres";

export default {
  props: ["listGenres", "toggleGenresMenu", "toggleSubNav"],
  data() {
    return {
      listGenres: [],
    };
  },
  mounted() {
    this.fetchGenres();
  },
  methods: {
    fetchGenres: function () {
      const { onResult } = useQuery(getGenresMenu);
      onResult((result) => {
        if (!result.data) return;
        this.listGenres = result.data.genres;
      });
    },
  },
};
</script>
<template>
  <div
    class="absolute lg:left-[14rem] left-[11rem] h-full bottom-0 lg:w-[30rem] w-[14rem]"
  >
    <div
      @mouseleave="toggleGenresMenu(true)"
      class="w-full h-fit sticky top-[10rem] bg-mainColor grid lg:grid-cols-4 grid-cols-2 rounded-sm border-solid border-r-0 border-t-0 border-b-0"
    >
      <router-link
        :to="`/genres/${genres._id}/${genres.name}`"
        @click="toggleSubNav(true)"
        class="hover:bg-secondColorBrighter font-bold cursor-pointer lg:p-4 p-2 text-white text-md decoration-none text-center"
        v-for="genres in listGenres"
      >
        {{ genres.name }}
      </router-link>
    </div>
  </div>
</template>
