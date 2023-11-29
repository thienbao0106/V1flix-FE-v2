<script lang="ts">
import { useRoute } from "vue-router";
import { capitalizeWord } from "../../utils/handleWord";
import { fetchSeries } from "../../utils/handleSeries";
import Card from "../components/Card.vue";
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
      console.log(loading.value);
      onResult((result) => {
        console.log(result);
        if (result.data) {
          console.log(loading.value);
          this.loading = loading.value;
          this.listResult = result.data.findSeries;
          console.log(result.data.findSeries);
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
  components: { Card },
};
</script>

<template>
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <main class="text-white px-8">
    <h1 class="font-2xl">{{ capitalizeWord(genre) }} Anime</h1>
    <section
      className="w-full grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="series in listResult"
        :id="series._id"
        :images="series.images"
        :total_episodes="series.total_episodes"
        :ep-created-at="series.created_at"
        :title="series.title"
        :status="series.status"
      />
    </section>
  </main>
</template>
