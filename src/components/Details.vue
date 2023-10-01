<script lang="ts">
export default {
  props: ["newep", "type", "status", "view", "check"],
};
</script>

<template>
  <main class="flex flex-row items-center justify-between w-full">
    <div class="flex flex-row justify-start items-center gap-2">
      <div
        class="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
      >
        <i class="pi pi-play lg:text-base md:text-md text-lg" />
        <span class="lg:text-base md:text-md text-lg">{{ newep }}</span>
      </div>
      <div
        class="flex justify-center items-center gap-2 rounded-br-md rounded-tl-md rounded-tr-lg rounded-bl-lg px-2 font-bold lg:text-base md:text-md text-lg"
        :class="
          status === 'Ongoing'
            ? 'bg-blue-500 '
            : status === 'Completed'
            ? 'bg-ongoing'
            : 'bg-red-500'
        "
      >
        <div v-if="status === 'Ongoing'">
          <i class="pi pi-play" />
        </div>
        <div v-else-if="status === 'Completed'">
          <i class="pi pi-check" />
        </div>
        <div v-else><i class="pi pi-stop-circle" /></div>
      </div>
      <div v-if="check" class="flex flex-row justify-start gap-0.5">
        <div
          class="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
        >
          <i class="pi pi-eye lg:text-base md:text-md text-lg" />
          <span class="lg:text-base md:text-md text-lg">{{ view }}</span>
        </div>
      </div>
    </div>
    <div class="xl:text-base lg:text-xl sm:text-2xl">{{ type }}</div>
  </main>
</template>
