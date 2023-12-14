<script lang="ts">
import { getImageType } from "../../../utils/handleImage";

export default {
  props: [
    "id",
    "title",
    "images",
    "type",
    "total_episodes",
    "status",
    "view",
    "current_episode",
  ],
  methods: {
    getImageType,
    toggleModal: function () {
      const dialog: any = document.querySelector(`#add-modal`);
      if (!dialog) return;

      dialog.showModal();
    },
  },
};
</script>
<template>
  <div class="flex flex-col w-full">
    <div class="relative group">
      <div>
        <img
          class="group-hover:opacity-25 max-w-full"
          :src="getImageType(images, `cover`)"
          :alt="`cover-image-${title}`"
          loading="lazy"
        />

        <div
          class="absolute top-3 right-3 h-full w-full flex justify-end items-start group-hover:translate-x-1 group-hover:duration-1000 opacity-0 group-hover:opacity-100"
        >
          <font-awesome-icon
            icon="fa-solid fa-ellipsis "
            size="xl"
            @click="toggleModal()"
            class="text-white group-hover:cursor-pointer bg-mainColor p-3 rounded-lg"
          />
        </div>
        <div class="absolute bottom-0 backdrop-blur-md bg-mainColor/30 px-2">
          <h3 class="lg:text-xl text-lg w-full line-clamp-2 pt-2">
            {{ title }}
          </h3>
          <div class="font-bold text-secondColor">
            {{ current_episode }}/{{ total_episodes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
