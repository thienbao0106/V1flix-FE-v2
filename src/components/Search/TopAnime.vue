<script lang="ts">
import TopAnimeCard from "../TopAnimeCard.vue";

export default {
  props: ["filter", "result"],
  components: { TopAnimeCard },
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">{{ `Top Anime ${filter}` }}</h1>
    <ul className="flex gap-3 flex-col" role="list">
      <li
        v-for="(s, index) in result"
        :key="s._id"
        className="list-none rounded-lg [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
      >
        <TopAnimeCard
          :id="s._id"
          :images="s.images"
          :status="s.status"
          :title="s.title"
          :total_episodes="s.total_episodes"
          :type="s.type"
          :rank="index + 1"
          :view="s.view"
        />
      </li>
    </ul>
  </div>
</template>
