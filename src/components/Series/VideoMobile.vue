<script lang="ts">
import { URL_TYPE } from "../../constants/video";

export default {
  props: ["source", "time", "subtitles"],
  setup(props) {
    console.log(props.subtitles);
    return {
      isDevEnv: import.meta.env.DEV,
    };
  },
  methods: {
    getSource: function () {
      return this.isDevEnv ? URL_TYPE.video : this.source;
    },
  },
};
</script>

<template>
  <section>
    <video
      class="w-full h-full"
      width="1280"
      height="760"
      controls
      preload="metadata"
      crossorigin="anonymous"
    >
      <source :src="getSource()" type="video/mp4" />
      <track
        v-for="sub in subtitles"
        :id="sub.source"
        :label="sub.label"
        kind="subtitles"
        :srclang="sub.lang"
        :src="sub.source"
      />
    </video>
  </section>
</template>
