<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import CommentCard from "./CommentCard.vue";
import { getUser } from "../../queries/users";
import { USER_QUERIES } from "../../constants/user";

export default {
  props: ["listComments"],
  setup(props) {
    console.log(props.listComments);
  },
  data() {
    return {
      username: "",
      avatar: "",
    };
  },
  methods: {
    fetchCurrentUser: function () {
      this.username = window.localStorage.getItem("username") || "";
      const { onResult } = useQuery(
        getUser(USER_QUERIES.header, this.username),
        {},
        {
          fetchPolicy: "no-cache",
        }
      );
      onResult((result: any) => {
        console.log(result);
        if (!result) return;
        this.avatar = result.data.findUserByName.avatar;
      });
    },
  },
  mounted() {
    this.fetchCurrentUser();
  },

  components: { CommentCard },
};
</script>

<template>
  <section>Comments</section>
  <section class="w-full flex flex-row gap-x-2">
    <div class="xl:w-[5%] w-[15%]">
      <img :src="avatar" class="rounded-full" />
    </div>
    <input
      type="text"
      :placeholder="`Comment as ${username}`"
      class="xl:w-[95%] w-[85%] rounded p-2 bg-opacityText"
    />
  </section>
  <CommentCard v-for="comment in listComments" :comment="comment" />
</template>
