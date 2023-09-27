<script lang="ts">
export default {
  props: ["newep", "type", "status"],
};
</script>

<template>
  <main class="flex flex-row w-full justify-between">
    <div className="flex flex-row justify-start gap-0.5">
      <div
        className="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
      >
        <i class="pi pi-play" />
        <span className="lg:text-base text-sm">{{ newep }}</span>
      </div>
    </div>
    <div
      className="flex justify-center items-center gap-2 bg-ongoing rounded-br-md rounded-tl-md rounded-tr-lg rounded-bl-lg px-2"
    >
      <i v-if="status === 'ongoing'" class="pi pi-play" />
      <i v-else-if="status === 'completed'" class="pi pi-check" />
      <i v-else class="pi pi-stop-circle" />
    </div>
    <span className="xl:text-base lg:text-xl sm:text-2xl">{{ type }}</span>
  </main>
</template>
