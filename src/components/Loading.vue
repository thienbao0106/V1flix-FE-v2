<script lang="ts">
export default {
  props: ["message"],
};
</script>

<template>
  <div
    className="text-4xl font-bold text-green-400 h-screen flex flex-col gap-y-2 justify-center items-center"
  >
    <i class="pi pi-spin pi-spinner"> </i>
    {{ message }}
  </div>
</template>
