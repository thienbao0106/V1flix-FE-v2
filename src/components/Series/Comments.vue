<script lang="ts">
import { useMutation, useQuery } from "@vue/apollo-composable";
import CommentCard from "./CommentCard.vue";
import { getUser } from "../../queries/users";
import { USER_QUERIES } from "../../constants/user";
import { DEFAULT_IMAGE } from "../../constants/image";
import { toast } from "vue3-toastify";
import { toastSettings } from "../../utils/toastSettings";
import { addCommentMutation } from "../../queries/episodes";

export default {
  props: ["listComments", "episodeId"],
  setup(props) {
    console.log(props.listComments);
  },
  data() {
    return {
      username: "",
      userId: "",
      avatar: DEFAULT_IMAGE.avatar,
      content: "",
      isUser: false,
      comments: this.listComments,
      currentSort: "decreasing",
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
        this.userId = result.data.findUserByName._id;
      });
    },
    handleShowButton: function () {
      if (this.username !== "") {
        this.isUser = true;
        return;
      }
      toast.error("You need to login to comment!", toastSettings.error);
    },
    sendComment: async function () {
      try {
        console.log(this.episodeId);
        const { mutate } = useMutation(addCommentMutation);

        const data: any = await mutate({
          episodeId: this.episodeId,
          userId: this.userId,
          content: this.content,
        });
        if (!data) {
          toast.error("Comment failed", toastSettings.error);
          return;
        }
        const newComment = data.data.addComments;
        this.comments.unshift(newComment);
        toast.success("Comment successfully", toastSettings.success);
      } catch (error: any) {
        toast.error(error, toastSettings.error);
        throw error;
      }
    },
    setSort: function (currentSort: string) {
      this.currentSort = currentSort;
      this.comments = this.comments.sort(
        (firstComment: any, secondComment: any) => {
          if (currentSort === "decreasing")
            return firstComment.created_at - secondComment.created_at;
          return secondComment.created_at - firstComment.created_at;
        }
      );
    },
  },
  mounted() {
    this.fetchCurrentUser();
  },

  components: { CommentCard },
};
</script>

<template>
  <main class="xl:space-y-5 space-y-8">
    <section>
      <h1 class="lg:text-3xl text-xl font-bold space-x-3">
        <span>{{ comments.length }} Comments</span>
        <font-awesome-icon
          v-if="currentSort === 'decreasing'"
          class="cursor-pointer"
          @click="setSort(`increasing`)"
          icon="fa-solid fa-sort-up"
        />
        <font-awesome-icon
          v-if="currentSort === 'increasing'"
          class="cursor-pointer"
          @click="setSort(`decreasing`)"
          icon="fa-solid fa-sort-down"
        />
      </h1>
    </section>
    <section class="w-full flex flex-row gap-x-2">
      <div class="xl:w-[5%] w-[10%]">
        <img :src="avatar" class="rounded-full" />
      </div>
      <div class="xl:w-[95%] w-[90%] flex flex-col gap-y-2 h-full">
        <input
          @click="() => handleShowButton()"
          type="text"
          :placeholder="
            username !== '' ? `Comment as ${username}` : `Add a comment...`
          "
          class="rounded p-2 bg-opacityText xl:h-[58px] lg:h-[100px] md:h-[75px] sm:h-[65px] h-full"
          v-model="content"
        />
        <button
          v-if="isUser"
          @click="() => sendComment()"
          class="w-fit rounded-lg font-bold p-2 bg-green-500 hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </section>
    <CommentCard v-for="comment in comments" :comment="comment" />
  </main>
</template>
