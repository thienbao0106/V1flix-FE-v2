<script lang="ts">
export default {
  props: ["trailer"],
};
</script>

<template>
  <div v-for="tr in trailer" class="w-full">
    <iframe
      :src="`https://www.youtube.com/embed/${tr.idTrailer}`"
      class="lg:w-[500px] w-full lg:h-[300px] h-[500px]"
      preload="none"
    >
    </iframe>
  </div>
</template>
