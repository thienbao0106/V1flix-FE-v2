<script lang="ts">
export default {
  props: ["idTrailer", "title", "index"],
  data() {
    return {
      videoTitle: "",
    };
  },
  methods: {
    closeModal: function () {
      const dialog: any = document.querySelector("#trailer-modal");
      dialog?.close();
    },
  },
  mounted() {
    const dialog: any = document.querySelector("#trailer-modal");
    if (!dialog) return;
    const iframe: any = document.querySelector("iframe");

    dialog.addEventListener("click", (e: any) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
        iframe.src = "";
      }
    });
  },
};
</script>

<template>
  <dialog
    id="trailer-modal"
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-1 xl:w-4/5 w-full h-[43rem] pt-1"
  >
    <header class="w-full flex flex-row justify-center">
      <h1 class="w-[90%] xl:text-4xl text-2xl font-bold pl-3">
        {{ title || `Official Trailer ${index}` }}
      </h1>
      <div
        @click="closeModal"
        class="cursor-pointer xl:text-4xl text-2xl font-bold hover:text-secondColor text-right pr-2 w-[10%] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      >
        X
      </div>
    </header>
    <iframe
      :src="`https://www.youtube.com/embed/${idTrailer}`"
      class="w-full h-[40rem]"
      loading="eager"
    >
    </iframe>
  </dialog>
</template>
