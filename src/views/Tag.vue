<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import ResultLayout from "../layouts/ResultLayout.vue";
import { findTags } from "../queries/tag";
import Card from "../components/Card.vue";
import Loading from "../components/Loading/Loading.vue";

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
  components: { ResultLayout, Card, Loading },
};
</script>

<template>
  <Loading
    v-if="loading || Object.keys(tag).length <= 0"
    :message="`Getting data`"
  />
  <main class="text-white px-8 space-y-3" v-else>
    <h1 class="font-bold text-2xl">{{ tagName }} Anime</h1>
    <p>{{ tag.description }}</p>
    <section
      v-if="tag.series.length > 0"
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
    </section>
    <section
      class="flex justify-center items-center w-full h-screen font-bold text-2xl"
      v-else
    >
      This tag doesn't have any series.
    </section>
  </main>
</template>
