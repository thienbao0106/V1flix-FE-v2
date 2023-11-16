<script lang="ts">
export default {
  props: ["newep", "type", "status", "view"],
};
</script>

<template>
  <main class="flex flex-row items-center justify-between w-full">
    <div class="flex flex-row justify-start items-center gap-2">
      <div class="flex flex-row justify-start gap-0.5">
        <div
          class="flex justify-center items-center gap-2 bg-detail rounded-br-xl rounded-l-md rounded-t-md px-2"
        >
          <font-awesome-icon
            icon="fa-solid fa-tv"
            size="1x"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
          <span class="lg:text-base md:text-md text-lg">{{ newep }}</span>
        </div>
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
          <font-awesome-icon
            icon="fa-solid fa-person-running"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
        </div>
        <div v-else-if="status === 'Completed'">
          <font-awesome-icon
            icon="fa-solid fa-check"
            size="1x"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
        </div>
        <div v-else>
          <font-awesome-icon
            icon="fa-solid fa-stop"
            size="1x"
            class="text-white lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
          />
        </div>
      </div>
    </div>
    <div class="xl:text-base lg:text-xl sm:text-2xl">{{ type }}</div>
  </main>
</template>
