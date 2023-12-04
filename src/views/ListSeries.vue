<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { listSeriesQuery } from "../queries/series";
import Card from "../components/Card.vue";
import Loading from "../components/Loading.vue";

export default {
  data() {
    return {
      listSeries: [] as any[],
      loading: false,
      totalPage: 0,
      currentPage: 0,
    };
  },

  methods: {
    fetchSeries: function (page: number) {
      console.log(Number.isNaN(page));
      let currentPage = Number.isNaN(page) ? 1 : page;
      this.currentPage = currentPage;

      const { onResult } = useQuery(listSeriesQuery(currentPage - 1, 4));
      this.loading = true;
      onResult((result) => {
        if (!result.data) return;
        console.log(result.data.series);
        const { series, totalPage } = result.data.series;
        console.log(totalPage);
        this.listSeries = series;
        this.totalPage = totalPage;
        this.loading = false;
      });
    },
    handleNavigation: function (type: string) {
      console.log("called");
      this.$router.push(
        `/series?page=${
          type === "next" ? this.currentPage + 1 : this.currentPage - 1
        }`
      );
    },
  },

  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        console.log(this.$route.query);
        const currentPage: any = this.$route.query.page;
        this.fetchSeries(parseInt(currentPage));
      },
      { immediate: true }
    );
  },
  components: { Card, Loading },
};
</script>

<template>
  <div class="text-4xl font-bold text-white" v-if="loading">
    <Loading message="Getting the data" />
  </div>
  <main class="text-white px-8">
    <h1 class="font-bold">List Series</h1>
    <section
      className="w-full grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="s in listSeries"
        :id="s._id"
        :images="s.images"
        :status="s.status"
        :title="s.title"
        :total_episodes="s.total_episodes"
        :type="s.type"
        :view="s.view"
      />
    </section>
    <section
      class="list-none w-full flex justify-center items-center flex-row gap-x-5 flex-wrap"
    >
      <button
        :disabled="currentPage === 1"
        @click="handleNavigation('prev')"
        class="text-white decoration-none disabled:opacity-60"
      >
        <div
          class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-mainColor"
        >
          Prev
        </div>
      </button>
      <router-link
        class="text-white decoration-none"
        v-for="index in totalPage"
        :key="index"
        :to="`/series?page=${index}`"
      >
        <div
          class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer"
          :class="`${index === currentPage ? 'bg-secondColor' : 'bg-gray-500'}`"
        >
          {{ index }}
        </div>
      </router-link>
      <button
        :disabled="currentPage === totalPage"
        @click="handleNavigation('next')"
        class="text-white outline-none disabled:opacity-60"
      >
        <div
          class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-mainColor"
        >
          Next
        </div>
      </button>
    </section>
  </main>
</template>
