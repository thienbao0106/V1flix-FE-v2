<script lang="ts">
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref } from "vue";
import { toastSettings } from "../../../utils/ToastSettings";
export default {
  props: ["seconds", "timestamp"],
  data() {
    return {
      url: window.location.href,
    };
  },
  setup() {
    const urlInput: any = ref(null);
    const timestampInput: any = ref(null);

    return {
      urlInput,
      timestampInput,
    };
  },
  methods: {
    closeModal: function () {
      const dialog = document.querySelector("dialog");
      dialog?.close();
    },
    copyClipboard: function (url: string) {
      toast("Copied successfully", toastSettings.success);
      navigator.clipboard.writeText(url);
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
    <section class="space-y-2">
      <h4>URL</h4>
      <div class="flex flex-row gap-2 justify-center items-center">
        <input
          type="text"
          ref="urlInput"
          :value="url"
          class="p-4 bg-mainColor text-white font-bold border-red w-[20rem] border-secondColor"
          disabled
        />

        <div
          @click="copyClipboard(urlInput.value)"
          class="bg-secondColor cursor-pointer p-4 rounded-md"
        >
          <i class="pi pi-copy"></i>
        </div>
      </div>
      <h4>{{ `Timestamp: ${timestamp}` }}</h4>
      <div class="flex flex-row gap-2 justify-center items-center">
        <input
          ref="timestampInput"
          type="text"
          :value="`${url}&t=${seconds}`"
          class="p-4 bg-mainColor text-white font-bold border-red w-[20rem] border-secondColor"
          disabled
        />

        <div
          @click="copyClipboard(timestampInput.value)"
          class="bg-secondColor cursor-pointer p-4 rounded-md"
        >
          <i class="pi pi-copy"></i>
        </div>
      </div>
    </section>
  </dialog>
</template>
