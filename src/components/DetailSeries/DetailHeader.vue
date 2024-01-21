<script lang="ts">
export default {
  props: ["title", "view", "favors"],
};
</script>

<template>
  <section
    class="flex lg:justify-between flex-col lg:h-[180px] h-full space-y-3 w-full"
  >
    <h1 class="font-bold text-3xl">{{ title.main_title }}</h1>
    <h2 class="text-md italic">{{ title.alt_title }}</h2>
    <div
      class="flex flex-row lg:justify-start justify-center items-center lg:gap-x-5 text-2xl font-bold"
    >
      <div
        class="lg:w-fit w-1/3 flex lg:justify-start justify-center items-center flex-row gap-x-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-eye"
          size="1x"
          class="text-green-500 lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
        />
        {{ view }}
      </div>
      <div
        class="lg:w-fit w-1/3 flex lg:justify-start justify-center items-center flex-row gap-x-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-heart"
          size="1x"
          class="text-red-500 lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
        />
        {{ favors }}
      </div>
      <div
        class="lg:w-fit w-1/3 flex lg:justify-start justify-center items-center flex-row gap-x-2"
      >
        <font-awesome-icon
          icon="fa-solid fa-star"
          size="1x"
          class="text-yellow-500 lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
        />
        {{ 0 }}
      </div>
    </div>
    <div>Genres</div>
  </section>
</template>
