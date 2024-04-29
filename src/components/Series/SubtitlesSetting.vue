<script lang="ts">
export default {
  props: ["setSubtitle", "currentSubtitle", "listLanguages", "setSelection"],
};
</script>

<template>
  <section>
    <div class="flex justify-between items-center pt-2">
      <h1 class="text-lg text-left">
        Subtitles
        <span class="text-secondColorBrighter"> {{ currentSubtitle }} </span>
      </h1>
      <font-awesome-icon
        @click="setSelection('')"
        icon="fa-solid fa-arrow-left"
        size="lg"
        class="text-white hover:text-secondColor hover:cursor-pointer"
      />
    </div>

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
