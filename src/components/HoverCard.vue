<script lang="ts">
export default {
  props: [
    "trailer",
    "description",
    "title",
    "totalEpisodes",
    "type",
    "isEndOfRow",
    "hoverPosition",
  ],
};
</script>

<template>
  <main
    class="z-12 absolute hidden lg:group-hover:block text-white bg-mainColor h-fit w-[400px] rounded-md top-1/3 p-2 space-y-3"
    :class="isEndOfRow ? hoverPosition.right : hoverPosition.left"
  >
    <h1 class="font-bold text-2xl">{{ title.main_title }}</h1>
    <div class="flex flex-row italic gap-x-3">
      <p>{{ type }}</p>
      <p>{{ totalEpisodes }} eps</p>
    </div>

    <p class="line-clamp-4">{{ description }}</p>
    <router-link :to="`/watch/${title.main_title}?ep=1`">
      <div
        class="bg-secondColor hover:bg-secondColorBrighter px-2 py-1.5 font-bold rounded-lg w-fit my-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-play "
          size="lg"
          class="text-white mr-2"
        />
        PLAY
      </div>
    </router-link>
  </main>
</template>
