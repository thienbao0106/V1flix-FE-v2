<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { getUser } from "../queries/users";

export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    const { username } = this.$route.params;
    const { onResult } = useQuery(
      getUser(
        [
          "_id",
          "avatar",
          "list { \n series { \n _id \n } \n status \n note \n }",
        ],
        username
      )
    );
    onResult((result) => {
      console.log(result.data);
    });
  },
};
</script>

<template>
  <div>
    <h1 class="text-white font-bold">Profile page</h1>
  </div>
</template>
