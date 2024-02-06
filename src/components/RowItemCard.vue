<script lang="ts">
import moment from "moment";
import { getImageType } from "../utils/handleImage";

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
    "rating",
  ],
  data() {
    return {
      isOwner: this.$route.params.username === "me",
      score:
        this.rating.find((rate: any) => {
          if (this.$route.params.username === "me")
            return (
              rate.user.username === window.localStorage.getItem("username")
            );
          rate.user.username === this.$route.params.username;
        })?.score || "",
    };
  },

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
      <div
        @click="date === '' && isOwner && toggleModal()"
        class="relative"
        :class="date !== '' ? `` : `group`"
      >
        <img
          class="lg:w-[8rem] sm:w-[6rem] w-full rounded-md"
          :class="
            isOwner &&
            'group-hover:opacity-25  hover:opacity-50 hover:cursor-pointer'
          "
          :src="getImageType(images, `cover`)"
          :alt="id"
        />
        <div
          v-if="isOwner"
          class="absolute top-0 w-full h-full flex justify-center items-center z-10 font-bold group-hover:translate-x-0 group-hover:duration-1000 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer"
        >
          <font-awesome-icon
            icon="fa-solid fa-ellipsis "
            size="xl"
            v-if="date === ''"
            class="text-white"
          />
        </div>
      </div>
    </div>
    <div class="xl:w-8/12 lg:w-6/12 md:w-5/12 w-4/12 text-left">
      <router-link
        :to="`/watch/${title.main_title}?ep=${
          date !== '' ? current_episode : '1'
        }`"
        class="lg:line-clamp-0 line-clamp-2 font-bold hover:text-secondColor"
      >
        {{ title.main_title }}
      </router-link>
    </div>
    <div class="w-2/12 text-center">
      <p class="lg:line-clamp-0 line-clamp-2 font-bold">
        {{ current_episode }}{{ `${date === "" ? `/${total_episodes}` : ``}` }}
      </p>
    </div>
    <div class="w-2/12 text-center font-bold">
      {{ score }}
      <font-awesome-icon
        v-if="score !== ''"
        icon="fa-solid fa-star"
        size="1x"
        class="text-secondColor lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
      />
    </div>
    <div class="w-4/12 flex justify-center">
      <div v-if="date === ''">
        {{ type }}
      </div>

      <p v-else>{{ formatDate(date) }}</p>
    </div>
  </div>
</template>
