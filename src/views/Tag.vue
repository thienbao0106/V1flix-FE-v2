<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import ResultLayout from "../layouts/ResultLayout.vue";
import { findTags } from "../queries/tag";
import Card from "../components/Card.vue";

export default {
  data() {
    return {
      loading: false,
      tagName: this.$route.params.name,
      tag: {} as any,
    };
  },
  methods: {
    fetchTag: function () {
      this.loading = true;
      const tagId = this.$route.params.id;
      console.log(tagId);
      const { onResult } = useQuery(findTags(tagId));
      onResult((result: any) => {
        if (!result.data) return;
        this.tag = result.data.findTagsById;
      });
      this.loading = false;
    },
  },
  mounted() {
    this.fetchTag();
  },
  components: { ResultLayout, Card },
};
</script>

<template>
  <ResultLayout :loading="loading" :title="`${tagName} Anime`">
    <main
      class="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <Card
        v-for="series in tag.series"
        :id="series._id"
        :images="series.images"
        :total_episodes="series.total_episodes"
        :ep-created-at="series.created_at"
        :title="series.title"
        :status="series.status"
      />
    </main>
  </ResultLayout>
</template>
