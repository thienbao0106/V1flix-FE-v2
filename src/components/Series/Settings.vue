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
    "setIsNext",
  ],
  data() {
    return {
      isNext: false,
    };
  },
  created() {
    this.$watch(
      () => this.isNext,
      () => {
        this.setIsNext(this.isNext);
      },
      { immediate: true }
    );
  },
  components: {
    SubtitlesSetting,
  },
};
</script>

<template>
  <section
    id="setting-box"
    class="bg-opacityText absolute bottom-[3.5rem] right-[1rem] px-2 pb-2 lg:left-[40rem] md:left-[30rem] left-[10rem] sm:left-[20rem] md:h-[10rem] sm:h-[8rem] z-99 rounded-lg overflow-y-auto bg-opacity-80"
    :class="
      isTheaterMode
        ? '2xl:left-[80rem] xl:left-[50rem]'
        : '2xl:left-[45rem] xl:left-[30rem] '
    "
  >
    <ul class="space-y-2 pt-2 text-lg" v-if="currentSelection === ''">
      <li
        class="w-full hover:bg-gray-700 py-2 hover:cursor-pointer px-2 rounded-md flex justify-between items-center"
      >
        <h1>Autoplay</h1>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            v-model="isNext"
            id="switch"
            type="checkbox"
            class="peer sr-only"
          />
          <label for="switch" class="hidden"></label>
          <div
            class="peer h-6 w-11 rounded-full border bg-gray-500 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondColor peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
          ></div>
        </label>
      </li>
      <li
        class="w-full hover:bg-gray-700 py-2 hover:cursor-pointer px-2 rounded-md"
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
