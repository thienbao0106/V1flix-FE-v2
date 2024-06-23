<script lang="ts">
import Search from "./Search.vue";

export default {
  data() {
    return {
      combination: false,
    };
  },
  props: ["setCloseSearch", "isCloseSearch"],

  methods: {
    closeModal: function () {
      const dialog: any = document.querySelector("#search-modal");
      dialog?.close();
    },
    handleKeyDown: function (event: any) {
      const keyName = event.key;
      if (event.ctrlKey && keyName === "q") {
        event.preventDefault(); // Prevent default action for keydown event
        this.combination = true;
        // Remove the event listener
        document.removeEventListener("keydown", this.handleKeyDown);
        return; // Returning false here does not serve any purpose; remove this line
      }
    },
  },
  mounted() {
    const dialog: HTMLDialogElement | null =
      document.querySelector("#search-modal");
    if (!dialog) return;
    const searchButton: HTMLButtonElement | null =
      document.querySelector("#search-button");
    console.log(searchButton);
    if (!searchButton) return;
    document.addEventListener("keydown", this.handleKeyDown);
    dialog.addEventListener("click", (e: any) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog?.close();
      }
    });
    dialog.addEventListener("close", (_event: any) => {
      this.setCloseSearch(true);
      document.body.style.overflowY = "scroll";
    });
  },
  components: { Search },
  created() {
    this.$watch(
      () => this.combination,
      () => {
        if (!this.combination) return;
        const dialog: any = document.querySelector("#search-modal");
        if (!dialog) return;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        this.setCloseSearch(false);
      },
      { immediate: true }
    );
  },
};
</script>
<template>
  <dialog
    id="search-modal"
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-5 p-5 mt-[2rem] w-[50rem]"
  >
    <Search :is-closed="isCloseSearch" />
  </dialog>
</template>
