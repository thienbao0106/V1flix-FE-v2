<script lang="ts">
export default {
  props: ["message", "height"],
};
</script>

<template>
  <div
    class="text-4xl font-bold text-green-400 flex h-screen flex-col gap-y-2 justify-center items-center"
  >
    <font-awesome-icon class="animate-spin" icon="fa-solid fa-spinner" />
    {{ message !== "" && message }}
  </div>
</template>
