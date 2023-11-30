<script lang="ts">
export default {
  props: ["listLanguages", "setSubtitle", "currentSubtitle", "isTheaterMode"],
};
</script>

<template>
  <section
    id="setting-box"
    class="bg-opacityText absolute bottom-[3.5rem] right-[1rem] px-5 pb-2 lg:left-[40rem] md:left-[30rem] left-[10rem] sm:left-[20rem] md:h-[10rem] sm:h-[8rem] z-99 rounded-lg overflow-y-auto bg-opacity-80"
    :class="
      isTheaterMode
        ? '2xl:left-[80rem] xl:left-[50rem]'
        : '2xl:left-[45rem] xl:left-[30rem] '
    "
  >
    <h1 class="text-lg pt-2 text-left">
      Subtitles
      <span class="text-secondColorBrighter"> {{ currentSubtitle }} </span>
    </h1>
    <ul class="list-none space-y-1.5 pt-1.5">
      <li
        class="cursor-pointer hover:text-secondColor"
        @click="setSubtitle(lang)"
        v-for="lang in listLanguages.sort(
          (langA: any, langB: any) => langA.lang - langB.lang
        )"
      >
        {{ `${lang.label} - ${lang.lang}` }}
      </li>
    </ul>
  </section>
</template>
