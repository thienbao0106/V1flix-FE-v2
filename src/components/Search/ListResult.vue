<script lang="ts">
import Card from "../Card.vue";
export default {
  props: ["results", "keyword"],
  components: { Card },
};
</script>

<template>
  <aside
    v-if="results.length > 0"
    class="grid lg:grid-cols-5 grid-cols-2 gap-y-5 gap-x-4"
  >
    <Card
      v-for="s in results"
      :id="s._id"
      :images="s.images"
      :status="s.status"
      :title="s.title"
      :total_episodes="s.total_episodes"
      :type="s.type"
      :view="s.view"
    />
  </aside>
  <aside
    v-else
    class="font-bold text-white flex justify-center items-center text-4xl h-[26rem]"
  >
    {{ `Can't find the data with keyword: ${keyword}` }}
  </aside>
</template>
