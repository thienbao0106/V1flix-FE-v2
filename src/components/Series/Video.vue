<script lang="ts">
export default {
  props: ["source"],
  setup(props) {
    return {
      ggDriveKey: import.meta.env.VITE_GG_DRIVE || "",
      source: props.source,
    };
  },
};
</script>
<template>
  <section>
    <video class="w-full h-full" width="1280" height="760" controls>
      <source
        :src="`https://www.googleapis.com/drive/v3/files/${source}?key=${ggDriveKey}&alt=media`"
        type="video/mp4"
      />
    </video>
  </section>
</template>
