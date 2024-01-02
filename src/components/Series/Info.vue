<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getImageType } from "../../utils/handleImage";
import { formatDuration } from "../../utils/handleSeries";
import {
  addSeriesFavorite,
  removeSeriesFavorite,
} from "../../utils/handleFavorite";
import { USER_QUERIES } from "../../constants/user";
import { getUser } from "../../queries/users";

export default {
  props: [
    "images",
    "id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",
    "genres",
    "duration",
    "favors",
    "isUser",
  ],
  data() {
    return {
      width: window.innerWidth,
      isSeeMore: false,
      isLiked: false,
      userId: "",
      favorNum: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.fetchFavorite();
    this.favorNum = this.favors;
    const descriptionBox: any = document.querySelector("#description");
    descriptionBox.innerHTML = this.description
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    getImageType,
    formatDuration,
    addSeriesFavorite,
    removeSeriesFavorite,
    onResize: function () {
      this.width = window.innerWidth;
    },
    toggleSeeMore: function (seeMore: boolean) {
      this.isSeeMore = !seeMore;
    },
    fetchFavorite: function () {
      const username = window.localStorage.getItem("username");
      const { onResult } = useQuery(getUser(USER_QUERIES.favor, username));
      onResult((result) => {
        if (!result.data) return;
        const { favoriteList, _id } = result.data.findUserByName;
        this.userId = _id;
        this.isLiked = favoriteList.find(
          (series: any) => series._id === this.id
        )
          ? true
          : false;
      });
    },
    setIsLike: function (isLiked: boolean) {
      this.isLiked = isLiked;
    },
    setFavorNum: function (favors: number) {
      this.favorNum = favors;
    },
  },
};
</script>

<template>
  <main
    id="info-main"
    class="flex md:flex-row flex-col w-full gap-x-4 bg-opacityText py-4 md:px-0 rounded-lg"
  >
    <section aria-label="image" class="basis-1/5 xl:pl-4 md:px-0 px-4">
      <img
        :src="getImageType(images, `cover`)"
        :alt="`img-${id}`"
        class="w-full md:h-fit h-[200px] object-cover"
      />
    </section>
    <section
      aria-label="content"
      class="basis-4/5 space-y-4 h-full xl:mt-0 mt-5 xl:pr-4 md:px-0 px-4"
    >
      <div class="flex justify-between gap-x-3">
        <h3 class="lg:text-3xl w-[70%] sm:text-4xl text-4xl font-bold">
          {{ title.main_title }}
        </h3>
        <div
          class="cursor-pointer w-fit h-fit hover:bg-red-600 p-2.5 rounded-lg text-white font-bold"
          :class="isLiked ? 'bg-red-700' : 'bg-red-500'"
          v-if="isUser !== '' && isUser"
          @click="
            isLiked
              ? removeSeriesFavorite(
                  id,
                  userId,
                  favorNum,
                  setIsLike,
                  setFavorNum
                )
              : addSeriesFavorite(id, userId, favorNum, setIsLike, setFavorNum)
          "
        >
          <font-awesome-icon class="mr-2" icon="fa-solid fa-heart" />
          {{ favorNum }}
        </div>
      </div>
      <h4 class="font-extralight">{{ title.alt_title }}</h4>
      <p
        id="description"
        class="font-light lg:text-lg text-sm w-full "
        :class="!isSeeMore && `line-clamp-2`"
      >
        
    </p>

      <div  class="flex justify-start items-start">
        <div
          class="cursor-pointer bg-secondColor hover:bg-secondColorBrighter p-2.5 rounded-lg text-white"
          @click="toggleSeeMore(isSeeMore)"
        >
          {{ isSeeMore ? "See Less" : "See More" }}
        </div>
      </div>

      <div class="lg:text-base text-sm">
        <ul
          class="grid sm:grid-cols-2 grid-cols-1 lg:gap-y-2 gap-y-0.5 list-none"
        >
          <li>
            Type:
            <span class="text-secondColor ml-3 font-bold">{{ type }}</span>
          </li>
          <li>
            View:
            <span class="text-secondColor ml-3 font-bold">{{ view }}</span>
          </li>
          <li>
            Episodes:
            <span class="text-secondColor ml-3 font-bold">
              {{ total_episodes }}
            </span>
          </li>
          <li>
            Genres:
            <span v-for="(g, index) in genres">
              <a
                class="text-secondColor hover:text-secondColorBrighter decoration-none ml-3 font-bold"
                :href="`/genres/${g.name}`"
              >
                {{ `${g.name} ${index === genres.length ? "," : ""} ` }}
              </a>
            </span>
          </li>
          <li>
            Status:
            <span class="text-secondColor ml-3 font-bold">
              {{ status }}
            </span>
          </li>
          <li>
            {{ type === "TV" ? "Episode Duration: " : "Duration" }}
            <span class="text-secondColor ml-3 font-bold">
              {{ formatDuration(duration) }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
