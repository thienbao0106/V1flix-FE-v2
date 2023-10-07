<script lang="ts">
export default {
  props: ["source"],
  data() {
    return {
      ggDriveKey: import.meta.env.VITE_GG_DRIVE,
    };
  },
  setup(props) {
    console.log(props.source);
  },
};
</script>
<template>
  <section>
    <video
      width="1280"
      height="720"
      controls
      preload="auto"
      controlsList="nodownload"
    >
      <source
        aria-label="720p"
        :src="`https://www.googleapis.com/drive/v3/files/${source}?key=${ggDriveKey}&alt=media`"
        type="video/mp4"
      />
    </video>
  </section>
</template>
