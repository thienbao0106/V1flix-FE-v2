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
        if (!result) return;
        this.avatar =
          result.data.findUserByName.avatar === ""
            ? DEFAULT_IMAGE.avatar
            : result.data.findUserByName.avatar;
        this.userId = result.data.findUserByName._id;
      });
    },
    handleShowButton: function (isUser: boolean) {
      if (this.username !== "") {
        this.isUser = isUser;
        if (isUser === false) this.content = "";
        return;
      }
      toast.error("You need to login to comment!", toastSettings.error);
    },
    sendComment: async function () {
      try {
        if (this.content.length === 0)
          throw new Error("Comment can't be emptied.");
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
        console.log(newComment);
        this.comments.unshift(newComment);
        toast.success("Comment successfully", toastSettings.success);
        this.content = "";
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message, toastSettings.error);
      }
    },
    filterComment: async function (commentId: any) {
      this.comments = this.comments.filter(
        (comment: any) => comment._id !== commentId
      );
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
      <h1
        class="xl:text-2xl text-xl font-bold space-x-3 flex flex-row justify-start items-center"
      >
        <span>{{ comments.length }} Comments</span>
        <font-awesome-icon
          v-if="currentSort === 'decreasing'"
          class="cursor-pointer hover:text-secondColor"
          @click="setSort(`increasing`)"
          icon="fa-solid fa-sort-up"
        />
        <font-awesome-icon
          v-if="currentSort === 'increasing'"
          class="cursor-pointer hover:text-secondColor"
          @click="setSort(`decreasing`)"
          icon="fa-solid fa-sort-down"
        />
      </h1>
    </section>
    <section class="w-full flex flex-row gap-x-4">
      <div class="2xl:w-[4.5%] lg:w-[7%] md:w-[8%] sm:w-[12%] w-[13%]">
        <img
          :src="avatar"
          class="rounded-full h-full 2xl:max-h-[50px] xl:max-h-[58px] lg:max-h-[100px] md:max-h-[75px] sm:max-h-[65px] max-h-[50px]"
        />
      </div>
      <div class="2xl:w-[95.5%] lg:w-[93%] md:w-[92%] sm:w-[88%] w-[87%]">
        <input
          @click="() => handleShowButton(true)"
          type="text"
          :placeholder="
            username !== '' ? `Comment as ${username}` : `Add a comment...`
          "
          class="rounded p-2 bg-opacityText w-full mb-2"
          v-model="content"
        />
        <div class="w-full flex justify-end items-end gap-x-3" v-if="isUser">
          <div
            @click="() => handleShowButton(false)"
            class="w-fit rounded-lg font-bold p-2 font-bold hover:cursor-pointer hover:text-secondColor"
          >
            Cancel
          </div>
          <button
            @click="() => sendComment()"
            class="w-fit rounded-lg font-bold p-2 bg-green-500 hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </section>
    <CommentCard
      v-for="comment in comments"
      :comment="comment"
      :current-user="username"
      :episode-id="episodeId"
      :filter-comment="filterComment"
    />
  </main>
</template>
