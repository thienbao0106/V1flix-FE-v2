<script lang="ts">
import { toast } from "vue3-toastify";
import { toastSettings } from "../../utils/toastSettings";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["episodeId"],
  data() {
    return {
      room: `/room/${uuidv4()}?episodeId=${this.episodeId}`,
      url: `${window.location.origin}`,
    };
  },
  methods: {
    closeModal: function () {
      const dialog: any = document.querySelector("#watch-modal");
      dialog?.close();
    },
    copyClipboard: function (url: string) {
      toast.success("Copied successfully", toastSettings.success);
      console.log(url);
      navigator.clipboard.writeText(url);
    },
  },
  mounted() {
    const dialog: any = document.querySelector("#watch-modal");
    if (!dialog) return;
    dialog.addEventListener("click", (e: any) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  },
};
</script>

<template>
  <dialog
    id="watch-modal"
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-5 p-5 h-[26%]"
  >
    <header class="flex justify-between items-center">
      <h1 class="font-bold text-xl">Watch Together</h1>
      <div @click="closeModal" class="cursor-pointer text-xl">X</div>
    </header>
    <section class="space-y-3">
      <h4>Host URL</h4>
      <div class="flex flex-row gap-2 justify-center items-center">
        <input
          type="text"
          ref="urlInput"
          :value="`${url}${room}&host=true`"
          class="p-4 bg-mainColor text-white font-bold w-[20rem] border-secondColor border"
          disabled
        />

        <div
          @click="copyClipboard(`${url}${room}&host=true`)"
          class="bg-secondColor cursor-pointer p-4 rounded-md"
        >
          <font-awesome-icon icon="fa-regular fa-copy" />
        </div>
      </div>
      <div class="flex flex-row justify-start items-center gap-x-2 p-0">
        <div>
          <router-link
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 bg-green-500 rounded-lg font-bold hover:bg-green-300"
            :to="`${room}&host=true`"
            >Join Room</router-link
          >
        </div>
        <div>
          <div
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 bg-green-500 rounded-lg font-bold hover:cursor-pointer hover:bg-green-300"
            @click="copyClipboard(`${url}${room}&host=false`)"
          >
            Share Room
          </div>
        </div>
      </div>
    </section>
  </dialog>
</template>
