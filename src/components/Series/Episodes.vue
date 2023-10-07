<script lang="ts">
export default {
  props: ["episode"],
  setup(props) {
    console.log(props.episode);
  },
};
</script>

<template>
  <li class="list-none text-white">
    {{ episode.epNum }}
  </li>
</template>
