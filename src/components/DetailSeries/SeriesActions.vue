<script lang="ts">
export default {
  props: ["title"],
  methods: {
    navigateSeries: function () {
      this.$router.push(`/watch/${this.title}?ep=1`);
    },
  },
};
</script>

<template>
  <div
    class="flex gap-x-3 lg:flex-col flex-row lg:justify-start lg:items-start justify-center items-center gap-y-3 mt-3"
  >
    <button
      @click="navigateSeries()"
      class="text-white bg-green-700 p-3 rounded-lg font-bold hover:bg-green-500 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-play" class="mr-2" />
      Play
    </button>
    <button
      class="text-white bg-red-500 p-3 rounded-lg font-bold hover:bg-red-700 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-flag" class="mr-2" />

      Report
    </button>
  </div>
</template>
