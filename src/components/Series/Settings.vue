<script lang="ts">
export default {
  props: ["listLanguages", "setSubtitle", "currentSubtitle"],
  setup(props) {
    console.log(props.currentSubtitle);
  },
};
</script>

<template>
  <section
    id="setting-box"
    class="bg-opacityText absolute bottom-[3.5rem] right-[1rem] left-[50rem] px-5 pb-2 h-[10rem] z-99 rounded-lg overflow-y-auto bg-opacity-80"
  >
    <h1 class="text-lg pt-2 text-left">
      Subtitles:
      <span class="text-secondColorBrighter"> {{ currentSubtitle }} </span>
    </h1>
    <ul class="list-none space-y-1.5 pt-1.5">
      <li
        class="cursor-pointer hover:text-secondColor"
        @click="setSubtitle(lang)"
        v-for="lang in listLanguages"
      >
        {{ `${lang.label} - ${lang.lang}` }}
      </li>
    </ul>
  </section>
</template>
