<script lang="ts">
export default {
  props: ["listLanguages", "setSubtitle", "currentSubtitle"],
  setup(props) {
    console.log(
      [...props.listLanguages].sort(
        (langA: any, langB: any) => langA.label - langB.label
      )
    );
  },
};
</script>

<template>
  <section
    id="setting-box"
    class="bg-opacityText absolute xl:left-[50rem] bottom-[3.5rem] right-[1rem] px-5 pb-2 h-[10rem] z-99 rounded-lg overflow-y-auto bg-opacity-80"
  >
    <h1 class="text-lg pt-2 text-left">
      Subtitles:
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
