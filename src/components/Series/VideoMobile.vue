<script lang="ts">
import { URL_TYPE } from "../../constants/video";

export default {
  props: ["source", "time", "subtitles"],
  setup(props) {
    return {
      ggDriveKey: import.meta.env.VITE_GG_DRIVE || "",
      currentSubtitle: props.subtitles.find((sub: any) => sub.lang === "en"),

      isDevEnv: import.meta.env.DEV,
    };
  },
  methods: {
    getSource: function () {
      return this.isDevEnv
        ? { video: URL_TYPE.video, subtitle: URL_TYPE.subtitles }
        : {
            video: URL_TYPE.ggDriveUrl(this.source, this.ggDriveKey),
            subtitle: URL_TYPE.ggDriveUrl(
              this.currentSubtitle.source,
              this.ggDriveKey
            ),
          };
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
      <source :src="getSource().video" type="video/mp4" />
      <track
        :default="currentSubtitle.source === `en` ? true : false"
        :id="currentSubtitle.source"
        :label="currentSubtitle.label"
        kind="subtitles"
        :srclang="currentSubtitle.lang"
        :src="getSource().subtitle"
      />
    </video>
  </section>
</template>
