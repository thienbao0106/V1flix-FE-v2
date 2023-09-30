<script lang="ts">
export default {
  props: ["newep", "type", "status", "view"],
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
      class="flex justify-center items-center gap-2 rounded-br-md rounded-tl-md rounded-tr-lg rounded-bl-lg px-2 font-bold"
      :class="
        status === 'Ongoing'
          ? 'bg-ongoing '
          : status === 'Completed'
          ? 'bg-secondColor'
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
    <div className="flex flex-row justify-start gap-0.5">
      <div
        className="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
      >
        <i class="pi pi-eye" />
        <span className="lg:text-base text-sm">{{ view }}</span>
      </div>
    </div>
    <span className="xl:text-base lg:text-xl sm:text-2xl">{{ type }}</span>
  </main>
</template>
