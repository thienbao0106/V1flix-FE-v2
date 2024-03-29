<script lang="ts">
import { capitalizeWord } from "../../utils/handleWord";

export default {
  props: ["listGenres", "toggleGenresMenu", "toggleSubNav", "isGenresList"],
  methods: {
    capitalizeWord,
  },
  components: {},
};
</script>
<template>
  <div
    @mouseleave="toggleGenresMenu(true)"
    class="absolute lg:left-[14rem] left-[11rem] overflow-auto top-[11rem] h-[500px] bottom-0 lg:w-[50rem] w-[14rem]"
  >
    <div
      v-if="listGenres.length > 0"
      class="w-full h-fit sticky bg-mainColor grid lg:grid-cols-4 grid-cols-2 rounded border-solid border-r-0 border-t-0 border-b-0"
    >
      <a
        :href="`/genres/${genres._id}/${genres.name}`"
        @click="toggleSubNav(true)"
        class="hover:bg-secondColorBrighter font-bold cursor-pointer lg:p-4 p-2 text-white text-md decoration-none text-center line-clamp-0"
        v-for="genres in listGenres"
      >
        {{ capitalizeWord(genres.name) }}
      </a>
    </div>
    <div
      class="sticky h-[100px] w-full bg-mainColor text-green-400 flex justify-center items-center"
      v-else
    >
      <font-awesome-icon
        class="animate-spin text-lg"
        icon="fa-solid fa-spinner"
      />
    </div>
  </div>
</template>
