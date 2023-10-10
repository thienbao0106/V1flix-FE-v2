<script lang="ts">
export default {
  data() {
    return {
      url: window.location.href,
    };
  },
  methods: {
    closeModal: function () {
      const dialog = document.querySelector("dialog");
      dialog?.close();
    },
  },
};
</script>

<template>
  <dialog
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-5 p-5"
  >
    <header class="flex justify-between items-center">
      <h1>Share</h1>
      <div @click="closeModal" class="cursor-pointer text-xl">X</div>
    </header>
    <section>
      <h4 class="mb-2">URL</h4>
      <div class="flex flex-row gap-2 justify-center items-center">
        <input
          type="text"
          :value="url"
          class="p-4 bg-mainColor text-white font-bold border-red w-[20rem] border-secondColor"
          disabled
        />
        <div class="bg-secondColor cursor-pointer p-4 rounded-md">
          <div>Copy</div>
        </div>
      </div>
    </section>
  </dialog>
</template>
