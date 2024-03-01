<script lang="ts">
import moment from "moment";
import { getImageType } from "../utils/handleImage";
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
          return rate.user.username === this.$route.params.username;
        })?.score || "",
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
        `/watch/${this.title.main_title}?ep=${
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
          class="group-hover:opacity-25 w-full"
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
          class="absolute left-0 right-0 bottom-0 backdrop-blur-md bg-black/50 px-2"
        >
          <h3 class="lg:text-xl text-lg w-full line-clamp-2 pt-2">
            {{ title.main_title }}
          </h3>
          <div
            v-if="current_episode !== undefined"
            class="font-extrabold text-secondColor flex justify-between items-start pt-1"
          >
            <div>
              {{ current_episode
              }}{{ `${date === "" ? `/${total_episodes}` : ``}` }}
            </div>
            <div>
              {{ score }}
              <font-awesome-icon
                v-if="score !== ''"
                icon="fa-solid fa-star"
                size="1x"
                class="text-secondColor lg:text-[1vw] md:text-[2vw] sm:text-[3.5vw] text-[2.5vw]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="date !== ''">{{ formatDate(date) }}</div>
  </div>
</template>
