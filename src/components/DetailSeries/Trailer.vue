<script lang="ts">
import TrailerModal from "./TrailerModal.vue";
export default {
  props: ["setTrailer", "trailer"],
  methods: {
    toggleModal: function (idTrailer: string, index: number) {
      this.setTrailer({ idTrailer, index: index + 1 });
      const dialog: any = document.querySelector(`#trailer-modal`);
      if (!dialog) return;
      console.log("called");
      dialog.showModal();
    },
  },
  components: { TrailerModal },
};
</script>

<template>
  <section class="w-full flex xl:flex-row flex-col gap-x-2">
    <div
      @click="toggleModal(tr.idTrailer, index)"
      class="relative group"
      v-for="(tr, index) in trailer"
    >
      <img
        class="group-hover:opacity-25 group-hover:cursor-pointer w-full rounded-3"
        :src="tr.thumbnail"
        :alt="`trailer-${tr.idTrailer}`"
      />
      <div
        class="absolute top-0 h-full w-full flex justify-center items-center group-hover:translate-x-1 group-hover:duration-1000 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
      >
        <font-awesome-icon
          icon="fa-solid fa-play"
          size="4x"
          class="text-white"
        />
      </div>
    </div>
  </section>
</template>
