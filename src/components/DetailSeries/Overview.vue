<script lang="ts">
import { formatDuration } from "../../utils/handleSeries";

export default {
  props: ["series"],
  methods: {
    formatDuration,
  },
  mounted() {
    const description: any = document.querySelector("#description");
    if (!description) return;
    description.innerHTML = this.series.description;
  },
};
</script>

<template>
  <div class="text-start space-y-6">
    <p id="description" class="w-full">
      {{ series.description }}
    </p>
    <div class="space-y-3">
      <p>
        Series Type:
        <span class="font-bold">{{ series.type }}</span>
      </p>
      <p>
        Total Episodes:
        <span class="font-bold">{{
          series.total_episodes === 0 ? "Not Updated" : series.total_episodes
        }}</span>
      </p>
      <p>
        Series Duration:
        <span class="font-bold">{{ formatDuration(series.duration) }}</span>
      </p>
      <p>
        Series Status:
        <span
          :class="
            series.status === 'Completed'
              ? 'text-green-500'
              : series.status === 'Releasing'
              ? 'text-secondColor'
              : 'text-red-500'
          "
          class="font-bold"
          >{{ series.status }}</span
        >
      </p>
      <p>
        Season:
        <span class="font-bold">{{ series.season }}</span>
      </p>
      <div class="space-y-2">
        <h3 class="">Tags:</h3>
        <div
          class="flex flex-wrap w-full lg:justify-start justify-start items-center gap-x-3 gap-y-2 rounded-lg"
        >
          <router-link
            v-for="tag in series.tags"
            :to="`/tag/${tag._id}/${tag.name}`"
          >
            <div
              class="font-bold bg-gray-700 px-5 py-2 hover:bg-secondColor lg:text-md text-sm"
            >
              {{ tag.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
