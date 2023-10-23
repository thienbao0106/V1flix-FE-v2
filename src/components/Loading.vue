<script lang="ts">
export default {
  props: ["message"],
};
</script>

<template>
  <div
    className="text-4xl font-bold text-green-400 h-screen flex flex-col gap-y-2 justify-center items-center"
  >
    <font-awesome-icon icon="fa-solid fa-spinner" />
    {{ message }}
  </div>
</template>
