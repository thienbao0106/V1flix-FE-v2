<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import ResultLayout from "../layouts/ResultLayout.vue";
import { getListUsers, findListUsers } from "../queries/users";
import UserCard from "../components/ListUsers/UserCard.vue";
export default {
  data() {
    return {
      loading: false,
      listUsers: [] as any,
      keyword: "",
      css: "bg-opacity-40 bg-gray-500 p-2 rounded-md w-full focus:outline-none focus:bg-gray-700 text-white",
    };
  },
  methods: {
    fetchSeries: function () {
      this.loading = true;
      const { onResult } = useQuery(
        getListUsers(["_id", "username", "avatar"])
      );
      onResult((result) => {
        if (!result.data) return;
        this.listUsers = result.data.users;
        this.loading = false;
      });
    },
    handleSearch: function (e: any) {
      e.preventDefault();
      const { onResult } = useQuery(
        findListUsers(["_id", "username", "avatar"], this.keyword)
      );
      onResult((result) => {
        if (!result.data) return;
        this.listUsers = result.data.findUsers;
        this.loading = false;
      });
    },
    handleReset: function () {
      this.keyword = "";
    },
  },
  mounted() {
    this.fetchSeries();
  },
  components: { ResultLayout, UserCard },
};
</script>

<template>
  <ResultLayout :loading="loading" :title="`List Users`">
    <form
      class="flex flex-row justify-between items-center gap-x-3 my-8"
      @submit="handleSearch"
      method="post"
    >
      <input placeholder="Search" :class="css" v-model="keyword" type="text" />
      <div class="flex flex-row gap-x-2">
        <button
          type="submit"
          class="bg-secondColor w-fit py-2 px-4 rounded-md font-bold flex sm:justify-start justify-center sm:items-start items-center gap-2 cursor-pointer text-white"
        >
          Submit
        </button>
        <button
          type="button"
          @click="handleReset()"
          class="bg-red-500 w-fit py-2 px-4 rounded-md font-bold flex sm:justify-start justify-center sm:items-start items-center gap-2 cursor-pointer text-white"
        >
          Reset
        </button>
      </div>
    </form>
    <section
      className="w-full grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-7 gap-y-4 lg:mt-4 mt-7"
    >
      <UserCard
        v-for="user in listUsers"
        :avatar="user.avatar"
        :username="user.username"
        :key="user._id"
      />
    </section>
  </ResultLayout>
</template>
