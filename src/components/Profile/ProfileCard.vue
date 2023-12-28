<script lang="ts">
import moment from "moment";
import { getImageType } from "../../utils/handleImage";
import { useRouter } from "vue-router";

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
  data() {
    return {
      isOwner: this.$route.params.username === "me",
    };
  },
  setup() {
    const router = useRouter();
    return {
      router,
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
    navigateSeries: function () {
      this.router.push(
        `/series/${this.title}?ep=${
          this.date !== "" ? this.current_episode : "1"
        }`
      );
      return;
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
          class="absolute top-3 right-3 gap-x-3 h-full w-full flex justify-end items-start group-hover:translate-x-1 group-hover:duration-1000 opacity-0 group-hover:opacity-100"
        >
          <font-awesome-icon
            icon="fa-solid fa-ellipsis "
            size="xl"
            v-if="date === '' && isOwner"
            @click="toggleModal()"
            class="text-white group-hover:cursor-pointer bg-mainColor p-3 rounded-lg"
          />
          <font-awesome-icon
            icon="fa-solid fa-play "
            size="xl"
            @click="navigateSeries()"
            class="text-white group-hover:cursor-pointer bg-mainColor p-3 rounded-lg"
          />
        </div>

        <div
          class="absolute left-0 right-0 bottom-0 backdrop-blur-md bg-mainColor/30 px-2"
        >
          <h3 class="lg:text-xl text-lg w-full line-clamp-2 pt-2">
            {{ title }}
          </h3>
          <div
            v-if="current_episode !== undefined"
            class="font-extrabold text-secondColor"
          >
            {{ current_episode
            }}{{ `${date === "" ? `/${total_episodes}` : ``}` }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="date !== ''">{{ formatDate(date) }}</div>
  </div>
</template>
