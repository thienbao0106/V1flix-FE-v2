<script lang="ts">
import Card from "../../components/Card.vue";

export default {
  props: ["listSeries"],

  components: { Card },
};
</script>

<template>
  <div>
    <div class="grid sm:grid-cols-5 grid-cols-2 w-full sm:ml-8 ml-0">
      <Card
        v-for="{ series } in listSeries"
        :id="series._id"
        :images="series.images"
        :status="series.status"
        :title="series.title"
        :total_episodes="series.total_episodes"
        :type="series.type"
        :view="series.view"
      />
    </div>
  </div>
</template>
