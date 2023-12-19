<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getUser } from "../queries/users";
import { USER_QUERIES } from "../constants/user";
import { DEFAULT_IMAGE } from "../constants/image";
import { capitalizeWord } from "../../utils/handleWord";

import Card from "../components/Card.vue";
import GridLayout from "../components/Profile/GridLayout.vue";
import Loading from "../components/Loading.vue";
import AddModal from "../components/AddModal.vue";
import ListStatus from "../components/Profile/ListStatus.vue";
import RowLayout from "../components/Profile/RowLayout.vue";
import Error from "../components/Error.vue";
import { useHead } from "@unhead/vue";

export default {
  data() {
    return {
      user: {} as any,
      currentType: "all",
      loading: false,
      series: {} as any,
      //temp list
      list: [] as any,
      typeList: [
        "All",
        "Completed",
        "Watching",
        "On-hold",
        "Dropped",
        "Plans To Watch",
      ],
      count: [] as any,
      defaultAvatar: DEFAULT_IMAGE.avatar,
      defaultBanner: DEFAULT_IMAGE.banner,
      totalEpisodes: 0,
      daysWatched: 0,
      layout: "grid",
      storageUser: window.localStorage.getItem("username"),
    };
  },

  created() {
    this.$watch(
      () => this.$route.fullPath,
      () => {
        this.loading = true;
        const { username } = this.$route.params;
        let name =
          username === "me"
            ? window.localStorage.getItem("username") || ""
            : username;
        const { onResult, onError } = useQuery(
          getUser(USER_QUERIES.profile, name),
          {},
          {
            fetchPolicy: "no-cache",
          }
        );
        onError((error) => {
          this.loading = false;
          console.error(error);
        });

        onResult((result) => {
          this.loading = false;
          if (!result || !result.data) return;
          const { list } = result.data.findUserByName;
          this.list = list;
          this.user = result.data.findUserByName;

          const { total_episodes, days_watched } =
            result.data.findUserByName.stats;
          this.totalEpisodes = total_episodes;
          this.daysWatched = days_watched;
          console.log(this.totalEpisodes);

          this.count = this.typeList.map((type: string, index: number) => {
            if (index === 0) return list.length;
            return list.filter((series: any) => {
              return series.status === type.toLocaleLowerCase();
            }).length;
          });

          //Update head metadata
          if (this.$route.params.username !== "me")
            useHead({
              title: `${this.user.username}`,
              meta: [
                {
                  property: "og:image",
                  content:
                    this.user.avatar === ""
                      ? DEFAULT_IMAGE.avatar
                      : this.user.avatar,
                },
                {
                  property: "og:title",
                  content: `${this.user.username}`,
                },
                {
                  property: "og:url",
                  content: window.location.href,
                },
                {
                  property: "og:description",
                  content: this.user.description,
                },
              ],
            });
        });
      },
      { immediate: true }
    );
  },
  components: {
    Card,
    GridLayout,
    Loading,
    AddModal,
    ListStatus,
    RowLayout,
    Error,
  },
  methods: {
    capitalizeWord,

    setCurrentType: function (type: string) {
      this.currentType = type;
      if (type === "All") {
        this.list = this.user.list;
        return;
      }
      this.list = this.user.list.filter(
        (series: any) => series.status === type.toLocaleLowerCase()
      );
    },
    setListSeries: function (listSeries: any) {
      this.list = listSeries;
    },
    setSeries: function (series: any) {
      if (this.series === series) return;
      this.series = series;
    },
    setLayout: function (layout: string) {
      this.layout = layout;
    },
  },
};
</script>

<template>
  <Loading v-if="loading" message="Getting info" />
  <AddModal
    v-if="Object.keys(series).length > 0"
    :series="series"
    :current-ep="1"
    :reload="true"
  />
  <main v-if="Object.keys(user).length > 0 && !loading" class="text-white">
    <div
      :style="{
        backgroundImage: `url(${defaultBanner})`,
      }"
      className="bg-center bg-no-repeat h-[20rem] w-full"
    ></div>
    <div class="-mt-20 px-10 space-y-5">
      <div
        class="flex lg:flex-row flex-col lg:justify-start justify-center lg:items-start items-center gap-x-4"
      >
        <img
          :src="user.avatar === '' ? defaultAvatar : user.avatar"
          alt="avatar"
          class="w-[10rem] lg:rounded-0 rounded-xl lg:pb-0 pb-5"
        />
        <section class="space-y-4 lg:text-start text-center lg:w-fit w-full">
          <h1 class="font-bold text-3xl">{{ user.username }}</h1>
          <h2 class="text-md">@{{ user.username }}</h2>
          <p class="">What's your thought...</p>
          <div
            class="bg-mainColor rounded-lg flex flex-row justify-between gap-x-[5rem] px-3 py-2"
          >
            <div class="text-center">
              <p class="font-bold text-secondColor lg:text-2xl text-xl">
                {{ totalEpisodes }}
              </p>
              <h1 class="lg:text-xl text-lg">Total Episodes</h1>
            </div>
            <div class="text-center">
              <p class="font-bold text-secondColor lg:text-2xl text-xl">
                {{ daysWatched }}
              </p>
              <h1 class="lg:text-xl text-lg">Days Watched</h1>
            </div>
          </div>
        </section>
      </div>
      <div class="w-full flex lg:flex-row flex-col gap-x-4">
        <ListStatus
          :count="count"
          :set-current-type="setCurrentType"
          :current-type="currentType"
          :type-list="typeList"
          :set-list-series="setListSeries"
          :user-list="user.list"
          :is-owner="$route.params.username === 'me'"
        />

        <section
          v-if="Object.keys(user).length > 0 && user.list.length > 0"
          class="lg:w-4/5 w-full space-y-5"
        >
          <div class="w-full flex justify-between items-center">
            <h1 class="font-bold text-xl lg:ml-8 ml-0">
              {{ capitalizeWord(currentType) }}
            </h1>

            <div v-if="list.length > 0" class="w-fit flex gap-x-3">
              <button
                @click="setLayout('grid')"
                class="bg-mainColor px-4 py-2 rounded-md hover-bg-secondColor"
              >
                <font-awesome-icon icon="fa-solid fa-grip" class="text-white" />
              </button>
              <button
                @click="setLayout('row')"
                class="bg-mainColor px-4 py-2 rounded-md hover:bg-secondColor"
              >
                <font-awesome-icon
                  icon="fa-solid fa-table"
                  class="text-white"
                />
              </button>
            </div>
          </div>
          <div
            class="font-bold lg:text-xl text-md lg:ml-8 ml-0 max-w-full flex justify-center items-center bg-mainColor rounded-lg xl:h-[3rem] h-[6rem]"
            v-if="currentType === 'history'"
          >
            <p class="lg:px-0 px-5 text-center">
              Watching history is currently only tracked on your device, and
              will be lost if you log out or clear site data.
            </p>
          </div>

          <GridLayout
            v-if="list.length > 0 && layout === 'grid'"
            :list-series="list"
            :set-series="setSeries"
          />
          <RowLayout
            v-else-if="list.length > 0 && layout === 'row'"
            :list-series="list"
            :set-series="setSeries"
          />
          <div
            v-else
            class="w-full lg:h-[10rem] h-full flex justify-center items-center font-bold text-white lg:pt-0 pt-5 lg:text-2xl text-xl"
          >
            This user doesn't have any anime in
            {{ currentType.toLowerCase() }} list.
          </div>
        </section>
        <div
          v-else
          class="w-full lg:h-[20rem] h-full flex justify-center items-center font-bold text-white lg:pt-0 pt-5 lg:text-4xl text-xl"
        >
          This user doesn't have any anime in list.
        </div>
      </div>
    </div>
  </main>
  <main class="text-white" v-else>
    <Error
      :message="
        $route.params.username === 'me'
          ? `Seems like you haven't logged in to the site`
          : `Can't find the user`
      "
    />
  </main>
</template>
