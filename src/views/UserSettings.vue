<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
//Constants
import { USER_QUERIES } from "../constants/user";
//Queries
import { getUser } from "../queries/users";
//Components
import Account from "../components/UserSettings/Account.vue";

export default {
  data() {
    return {
      isValidToken: window.localStorage.getItem("token"),
      username: window.localStorage.getItem("username"),
      user: {},
      listMenu: ["Account", "Notification"],
      section: "Account",
    };
  },
  methods: {
    fetchUserInfo: function () {
      const { onResult } = useQuery(
        getUser(USER_QUERIES.settings, this.username),
        {},
        {
          fetchPolicy: "no-cache",
        }
      );
      onResult((result) => {
        if (!result.data) return;
        this.user = result.data.findUserByName;
      });
    },
    toggleSection: function (section: string) {
      this.section = section;
    },
  },
  mounted() {
    if (!this.isValidToken) window.location.href = "/login";
    document.title = "Settings";
    this.fetchUserInfo();
  },
  components: { Account },
};
</script>

<template>
  <main
    class="lg:px-8 px-4 text-white flex lg:flex-row flex-col w-full h-screen lg:gap-x-3 gap-y-4"
  >
    <div class="lg:w-[15%] w-full space-y-3">
      <h1 class="font-bold text-2xl">Settings</h1>
      <ul class="list-none space-y-3">
        <li
          class="pl-2 py-2 hover:cursor-pointer hover:bg-gray-500 rounded-lg hover:font-bold"
          @click="toggleSection(item)"
          v-for="item in listMenu"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="lg:w-[85%] w-full">
      <Account :account="user" v-if="section === 'Account'" />
      <div
        class="h-screen w-full flex justify-center items-center font-bold text-3xl"
        v-else
      >
        This will be implemented soon.
      </div>
    </div>
  </main>
</template>
