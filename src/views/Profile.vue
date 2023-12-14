<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getUser } from "../queries/users";
import { QUERIES } from "../constants/video";
import { capitalizeWord } from "../../utils/handleWord";
import Card from "../components/Card.vue";
import GridLayout from "../components/Profile/GridLayout.vue";
import Loading from "../components/Loading.vue";
import AddModal from "../components/AddModal.vue";
import ListStatus from "../components/Profile/ListStatus.vue";

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
    };
  },
  created() {
    this.$watch(
      () => this.$route.fullPath,
      () => {
        this.loading = true;
        const { username } = this.$route.params;
        const query = QUERIES["search"].join(" \n ");

        const { onResult } = useQuery(
          getUser(
            [
              "_id",
              "avatar",
              "username",
              `list { \n series { ${query} } \n status \n note \n currentEp \n }`,
            ],
            username
          ),
          {},
          {
            fetchPolicy: "no-cache",
          }
        );
        onResult((result) => {
          this.loading = false;
          if (!result.data) return;
          const { list } = result.data.findUserByName;
          this.list = list;
          this.user = result.data.findUserByName;
          this.count = this.typeList.map((type: string, index: number) => {
            if (index === 0) return list.length;
            return list.filter((series: any) => {
              return series.status === type.toLocaleLowerCase();
            }).length;
          });
        });
      },
      { immediate: true }
    );
  },
  components: { Card, GridLayout, Loading, AddModal, ListStatus },
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
    setSeries: function (series: any) {
      if (this.series === series) return;

      this.series = series;
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
  <main class="text-white">
    <div
      :style="{
        backgroundImage: `url(/assets/cover.png)`,
      }"
      className="bg-center bg-no-repeat h-[20rem] w-full"
    ></div>
    <div class="-mt-20 px-10 space-y-5">
      <div
        class="flex lg:flex-row flex-col lg:justify-start justify-center lg:items-start items-center gap-x-4"
      >
        <img
          :src="user.avatar === '' ? '/assets/avatar.png' : user.avatar"
          alt="avatar"
          class="w-[10rem] lg:rounded-0 rounded-xl lg:pb-0 pb-5"
        />
        <section class="space-y-4 lg:text-start text-center">
          <h1 class="font-bold text-3xl">{{ user.username }}</h1>
          <h2 class="text-md">@{{ user.username }}</h2>
          <p class="">What's your thought...</p>
        </section>
      </div>
      <div class="w-full flex lg:flex-row flex-col gap-x-4">
        <ListStatus
          :count="count"
          :set-current-type="setCurrentType"
          :type-list="typeList"
        />

        <section
          v-if="Object.keys(user).length > 0 && user.list.length > 0"
          class="lg:w-4/5 w-full"
        >
          <h1 class="font-bold pb-5 text-xl lg:ml-8 ml-0">
            {{ capitalizeWord(currentType) }}
          </h1>

          <GridLayout
            v-if="list.length > 0"
            :key="$route.fullPath"
            :listSeries="list"
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
</template>
