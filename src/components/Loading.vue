<script lang="ts">
export default {
  props: ["message", "height"],
};
</script>

<template>
  <div
    class="text-4xl font-bold text-green-400 flex h-screen flex-col gap-y-2 justify-center items-center"
  >
    <font-awesome-icon icon="fa-solid fa-spinner" />
    {{ message }}
  </div>
</template>
