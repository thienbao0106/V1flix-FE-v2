<script lang="ts">
export default {
  props: [""],
  data() {
    return {
      content: "",
    };
  },
};
</script>
<template>
  <section class="border border-white p-2 rounded-lg">
    <h1 class="font-bold text-lg">Chatbox</h1>
    <div class="overflow-y-auto h-[23.8rem]">Hello world</div>
    <input
      placeholder="Comment here"
      class="bg-opacityText rounded-lg w-full py-3 px-1"
      type="text"
      v-model="content"
    />
  </section>
</template>
