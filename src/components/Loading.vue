<script lang="ts">
export default {
  props: ["message", "height"],
};
</script>

<template>
  <div
    class="lg:text-4xl text-2xl font-bold text-green-400 flex h-screen flex-col gap-y-2 justify-center items-center text0center"
  >
    <font-awesome-icon class="animate-spin" icon="fa-solid fa-spinner" />
    {{ message !== "" && message }}
  </div>
</template>
