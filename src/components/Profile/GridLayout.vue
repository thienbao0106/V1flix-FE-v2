<script lang="ts">
import Card from "../../components/Card.vue";
import ProfileCard from "./ProfileCard.vue";

export default {
  props: ["listSeries", "setSeries"],
  setup(props) {
    console.log(props.listSeries);
  },
  components: { Card, ProfileCard },
};
</script>

<template>
  <div>
    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full lg:ml-8 ml-0 gap-x-5 gap-y-5"
    >
      <ProfileCard
        @click="setSeries(series)"
        v-for="{ series, currentEp, date } in listSeries"
        :id="series._id"
        :images="series.images"
        :status="series.status"
        :title="series.title"
        :total_episodes="series.total_episodes"
        :type="series.type"
        :view="series.view"
        :current_episode="currentEp"
        :date="date || ``"
      />
    </div>
  </div>
</template>
