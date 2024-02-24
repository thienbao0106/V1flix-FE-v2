<script lang="ts">
import handleVideo from "../../utils/video/index";
import { URL_TYPE } from "../../constants/video";
export default {
  props: ["episode", "setShow"],

  setup(props) {
    console.log(props.episode.subtitles);
    return {
      isDevEnv: import.meta.env.DEV,
    };
  },
  methods: {
    getSource: function () {
      return this.isDevEnv
        ? URL_TYPE.video
        : handleVideo.checkSource(this.episode.source);
    },
    checkSubtitleSource: handleVideo.checkSource,
  },
};
</script>

<template>
  <main class="flex flex-col gap-y-3">
    <div class="text-2xl flex justify-between">
      <div>
        Episode
        <span class="font-bold">{{ episode.epNum }}</span>
        -
        <span class="font-bold">{{ episode.title }}</span>
      </div>
      <div class="cursor-pointer" @click="() => setShow()">
        <font-awesome-icon icon="fa-solid fa-expand" />
      </div>
    </div>
    <div>
      <video
        class="w-full rounded-lg"
        width="1280"
        height="760"
        controls
        preload="metadata"
        crossorigin="anonymous"
      >
        <source :src="getSource()" type="video/mp4" />
        <track
          v-for="sub in episode.subtitles"
          :id="sub.source"
          :label="sub.label"
          kind="subtitles"
          :srclang="sub.lang"
          :src="checkSubtitleSource(sub.source)"
        />
      </video>
    </div>
  </main>
</template>
