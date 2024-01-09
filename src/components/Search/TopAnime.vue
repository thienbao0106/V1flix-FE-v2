<script lang="ts">
import TopAnimeCard from "../TopAnimeCard.vue";

export default {
  props: ["filter", "result"],
  components: { TopAnimeCard },
};
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-3xl font-bold">{{ `Top Anime` }}</h1>
    <p
      class="bg-mainColor lg:text-center text-left lg:pl-0 pl-2 py-3 rounded-lg"
    >
      This list is based on keyword that you search.
    </p>
    <ul className="flex gap-3 flex-col" role="list">
      <li
        v-for="(s, index) in result"
        :key="s._id"
        class="list-none rounded-lg border-solid border-l-0 border-t-0 border-b-0 [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
      >
        <TopAnimeCard
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :totalEpisodes="s.total_episodes"
          :type="s.type"
          :rank="index + 1"
          :view="s.view"
        />
      </li>
    </ul>
  </div>
</template>
