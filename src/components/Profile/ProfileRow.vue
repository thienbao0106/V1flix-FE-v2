<script lang="ts">
import moment from "moment";
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
    "date",
  ],
  methods: {
    getImageType,
    toggleModal: function () {
      const dialog: any = document.querySelector(`#add-modal`);
      if (!dialog) return;

      dialog.showModal();
    },
    formatDate: function (date: string) {
      return moment(date).fromNow();
    },
  },
};
</script>

<template>
  <div
    class="w-full flex flex-row bg-mainColor h-full justify-start items-center gap-x-3"
  >
    <div class="h-full xl:w-1/12 lg:w-2/12 md:w-1/12 w-3/12 px-2 py-2">
      <img
        class="lg:w-[8rem] sm-w-[6rem] w-full rounded-md"
        :src="getImageType(images, `cover`)"
        :alt="id"
      />
    </div>
    <div class="xl:w-8/12 lg:w-6/12 md:w-5/12 w-4/12 text-left">
      <router-link
        :to="`/series/${title}?ep=${date !== '' ? current_episode : '1'}`"
        class="lg:line-clamp-0 line-clamp-2 font-bold hover:text-secondColor"
      >
        {{ title }}
      </router-link>
    </div>
    <div class="w-2/12 text-left">
      <p class="lg:line-clamp-0 line-clamp-2 font-bold">
        {{ current_episode }}{{ `${date === "" ? `/${total_episodes}` : ``}` }}
      </p>
    </div>
    <div class="w-4/12 flex justify-center">
      <font-awesome-icon
        icon="fa-solid fa-ellipsis "
        size="xl"
        v-if="date === ''"
        @click="toggleModal()"
        class="text-white group-hover:cursor-pointer bg-secondColor hover:bg-secondColorBrighter hover:cursor-pointer p-3 rounded-lg"
      />
      <p v-else>{{ formatDate(date) }}</p>
    </div>
  </div>
</template>
