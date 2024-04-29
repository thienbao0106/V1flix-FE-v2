<script lang="ts">
import SubtitlesSetting from "./SubtitlesSetting.vue";
export default {
  props: [
    "listLanguages",
    "setSubtitle",
    "currentSubtitle",
    "isTheaterMode",
    "setSelection",
    "currentSelection",
  ],

  methods: {},

  components: {
    SubtitlesSetting,
  },
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
    <ul class="space-y-2 pt-2 text-lg" v-if="currentSelection === ''">
      <li>Autoplay</li>
      <li
        class="hover:cursor-pointer hover:text-secondColor"
        @click="setSelection('subtitle')"
      >
        Subtitle
      </li>
    </ul>
    <SubtitlesSetting
      v-if="currentSelection === 'subtitle'"
      :current-subtitle="currentSubtitle"
      :list-languages="listLanguages"
      :set-subtitle="setSubtitle"
      :set-selection="setSelection"
    />
  </section>
</template>
