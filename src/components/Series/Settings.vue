<script lang="ts">
export default {
  props: ["listLanguages", "setSubtitle"],
  setup(props) {
    console.log(props.listLanguages);
  },
};
</script>

<template>
  <section
    id="setting-box"
    class="bg-mainColor h-[40px] absolute bottom-[3.5rem] right-[8.5rem] px-5 pb-2 text-center h-fit z-99 rounded-lg"
  >
    <h1 class="text-lg">Subtitles</h1>
    <ul class="list-none">
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
