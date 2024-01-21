<script lang="ts">
export default {
  props: ["series"],
  mounted() {
    const description: any = document.querySelector("#description");
    if (!description) return;
    description.innerHTML = this.series.description;
  },
};
</script>

<template>
  <div class="text-start">
    <p id="description" class="w-full">
      {{ series.description }}
    </p>
  </div>
</template>
