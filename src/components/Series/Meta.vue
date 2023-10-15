<script lang="ts">
export default {
  props: ["title", "epNum", "description", "images"],
  data() {
    return {
      url: window.location.href,
    };
  },
  methods: {
    getCoverImage: function (images: any[]): string {
      if (!images) return "";
      return images.find((image) => image.type === "cover").source;
    },
  },
};
</script>

<template>
  <meta id="og-url" property="og:url" :content="url" />
  <meta id="og-title" property="og:title" :content="`${title} - ${epNum}`" />
  <meta
    id="og-description"
    property="og:description"
    :content="`${description}`"
  />
  <meta
    id="og-image"
    property="og:image"
    :content="`${getCoverImage(images)}`"
  />
</template>
