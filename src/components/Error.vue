<script lang="ts">
export default {
  props: ["message"],
};
</script>

<template>
  <section
    class="h-screen flex flex-col justify-center items-center text-white gap-y-8"
  >
    <font-awesome-icon
      icon="fa-solid fa-triangle-exclamation"
      class="text-yellow-400"
      size="4x"
    />
    <h1 class="text-4xl font-bold tracking-wide">
      {{ message }}
    </h1>
  </section>
</template>
