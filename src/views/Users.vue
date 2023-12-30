<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import ResultLayout from "../layouts/ResultLayout.vue";
import { getListUsers } from "../queries/users";
import UserCard from "../components/ListUsers/UserCard.vue";
export default {
  data() {
    return {
      loading: false,
      listUsers: [] as any,
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
  },
  mounted() {
    this.fetchSeries();
  },
  components: { ResultLayout, UserCard },
};
</script>

<template>
  <ResultLayout :loading="loading" :title="`List Users`">
    <UserCard
      v-for="user in listUsers"
      :avatar="user.avatar"
      :username="user.username"
      :key="user._id"
    />
  </ResultLayout>
</template>
