<script lang="ts">
export default {
  props: ["trailer"],
};
</script>

<template>
  <div class="w-full">
    <iframe
      :src="`https://www.youtube.com/embed/${trailer.id}`"
      width="500"
      height="300"
      preload="none"
    >
    </iframe>
  </div>
</template>
