<script lang="ts">
import Card from "../Card.vue";

export default {
  props: ["relations"],
  components: { Card },
  setup(props) {
    console.log(props.relations);
  },
};
</script>
<template>
  <main
    class="w-full grid lg:grid-cols-5 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
  >
    <div v-for="series in relations">
      <div class="text-left font-bold text-xl">{{ series.role }}</div>
      <Card
        :id="series.related_series._id"
        :images="series.related_series.images"
        :total_episodes="series.related_series.total_episodes"
        :title="series.related_series.title"
        :status="series.related_series.status"
      />
    </div>
  </main>
</template>
