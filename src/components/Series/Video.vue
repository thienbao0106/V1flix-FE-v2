<script lang="ts">
import { onMounted } from "vue";

export default {
  props: ["source", "time"],
  setup(props) {
    onMounted(() => {
      const video = document.querySelector("video");
      if (!video) return;
      video.currentTime = parseFloat(props.time || 0);
    });
    return {
      ggDriveKey: import.meta.env.VITE_GG_DRIVE || "",
      source: props.source,
    };
  },
};
</script>
<template>
  <section>
    <video
      ref="videoRef"
      class="w-full h-full"
      width="1280"
      height="760"
      controls
    >
      <source
        :src="`https://www.googleapis.com/drive/v3/files/${source}?key=${ggDriveKey}&alt=media`"
        type="video/mp4"
      />
      This video type can't be supported
    </video>
  </section>
</template>
