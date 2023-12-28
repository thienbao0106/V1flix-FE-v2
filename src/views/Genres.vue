<script lang="ts">
import { useRoute } from "vue-router";
import { capitalizeWord } from "../utils/handleWord";
import { fetchSeries } from "../utils/handleSeries";
import Card from "../components/Card.vue";
import ResultLayout from "../layouts/ResultLayout.vue";
export default {
  data() {
    return {
      listResult: [] as any,
      loading: false,
    };
  },
  setup() {
    const route = useRoute();
    const { id, name } = route.params;
    console.log(name);
    return {
      genre: name,
      id,
    };
  },
  methods: {
    capitalizeWord,
    fetchSeriesGenres: function () {
      console.log(this.genre);
      const { onResult, loading } = fetchSeries(
        "",
        "search",
        "default",
        this.id
      );
      this.loading = loading.value;
      onResult((result: any) => {
        if (result.data) {
          this.loading = loading.value;
          this.listResult = result.data.findSeries;
        }
      });
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        console.log("called");
        this.fetchSeriesGenres();
      },
      { immediate: true }
    );
  },
  components: { Card, ResultLayout },
};
</script>

<template>
  <ResultLayout :loading="loading" :title="`${genre} Anime`">
    <Card
      v-for="series in listResult"
      :id="series._id"
      :images="series.images"
      :total_episodes="series.total_episodes"
      :ep-created-at="series.created_at"
      :title="series.title"
      :status="series.status"
    />
  </ResultLayout>
</template>
