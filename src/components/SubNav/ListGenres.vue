<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getGenresMenu } from "../../queries/genres";

export default {
  props: ["listGenres", "toggleGenresMenu"],
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
      console.log("test");
      const { onResult } = useQuery(getGenresMenu);
      onResult((result) => {
        if (result.data) {
          console.log(result.data.genres);
          this.listGenres = result.data.genres;
        }
      });
    },
  },
};
</script>
<template>
  <div class="absolute left-[14rem] h-fit top-[4rem] w-[30rem]">
    <div
      @mouseleave="toggleGenresMenu(true)"
      class="w-full bg-mainColor grid grid-cols-4 rounded-sm border-solid border-r-0 border-t-0 border-b-0"
    >
      <div
        class="hover:bg-secondColorBrighter font-bold cursor-pointer p-4"
        v-for="genres in listGenres"
      >
        {{ genres.name }}
      </div>
    </div>
  </div>
</template>
