<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getUser } from "../queries/users";
import { QUERIES } from "../constants/video";
import { capitalizeWord } from "../../utils/handleWord";
import Card from "../components/Card.vue";
import GridLayout from "../components/Profile/GridLayout.vue";

export default {
  data() {
    return {
      user: {} as any,
      currentType: "all",
      typeList: [
        "All",
        "Completed",
        "Watching",
        "On-hold",
        "Dropped",
        "Plans To Watch",
      ],
    };
  },
  mounted() {
    const { username } = this.$route.params;
    const query = QUERIES["search"].join(" \n ");

    const { onResult } = useQuery(
      getUser(
        [
          "_id",
          "avatar",
          "username",
          `list { \n series { ${query} } \n status \n note \n }`,
        ],
        username
      )
    );
    onResult((result) => {
      if (!result.data) return;
      console.log(result.data.findUserByName);
      this.user = result.data.findUserByName;
    });
  },
  components: { Card, GridLayout },
  methods: {
    capitalizeWord,
    setCurrentType: function (type: string) {
      this.currentType = type;
    },
  },
};
</script>

<template>
  <main class="text-white">
    <div
      :style="{
        backgroundImage: `url(/assets/cover.png)`,
      }"
      className="bg-center bg-no-repeat h-[20rem] w-full"
    ></div>
    <div class="-mt-20 px-10 space-y-5">
      <div
        class="flex sm:flex-row flex-col sm:justify-start justify-center sm:items-start items-center gap-x-4"
      >
        <img
          :src="user.avatar === '' ? '/assets/avatar.png' : user.avatar"
          alt="avatar"
          class="w-[10rem] sm:rounded-0 rounded-xl sm:pb-0 pb-5"
        />
        <section class="space-y-4 sm:text-start text-center">
          <h1 class="font-bold text-3xl">{{ user.username }}</h1>
          <h2 class="text-md">@{{ user.username }}</h2>
          <p class="">What's your thought...</p>
        </section>
      </div>
      <div class="w-full flex sm:flex-row flex-col gap-x-4">
        <section class="sm:w-[20rem] w-full sm:mb-0 mb-5">
          <h1 class="font-bold text-xl">Lists</h1>
          <ul class="pt-5">
            <li
              v-for="type in typeList"
              class="hover:bg-secondColor hover:cursor-pointer hover:font-bold py-3 pl-3"
              @click="setCurrentType(type)"
            >
              {{ type }}
            </li>
          </ul>
        </section>
        <section>
          <h1 class="font-bold pb-5 text-xl sm:ml-8 ml-0">
            {{ capitalizeWord(currentType) }}
          </h1>

          <GridLayout
            v-if="Object.keys(user).length > 0"
            :listSeries="user.list"
          />
        </section>
      </div>
    </div>
  </main>
</template>
