<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import moment from "moment";
import {
  deleteCommentMutation,
  updateCommentMutation,
} from "../../queries/episodes";
import { toast } from "vue3-toastify";
import { toastSettings } from "../../utils/toastSettings";
import { DEFAULT_IMAGE } from "../../constants/image";
export default {
  props: ["comment", "currentUser", "episodeId", "filterComment"],
  data() {
    return {
      isSeeMore: false,
      isUpdate: false,
      updatedContent: "",
      avatar:
        this.comment.user.avatar === ""
          ? DEFAULT_IMAGE.avatar
          : this.comment.user.avatar,
    };
  },

  methods: {
    formatTime: function (time: any) {
      return moment(time).fromNow();
    },
    setSeeMore: function (isSeeMore: boolean) {
      this.isSeeMore = !isSeeMore;
    },
    setUpdate: function (isUpdate: boolean) {
      this.isUpdate = isUpdate;
      if (this.isUpdate === true) this.updatedContent = this.comment.content;
    },
    deleteComment: async function () {
      try {
        const { mutate } = useMutation(deleteCommentMutation);
        const result = await mutate({
          episodeId: this.episodeId,
          commentId: this.comment._id,
        });
        if (!result) {
          toast.error("Can't delete this comment", toastSettings.error);
          return;
        }
        toast.success("Delete comment successfully", toastSettings.success);
        this.filterComment(this.comment._id);
        return;
      } catch (error) {
        throw error;
      }
    },
    updateComment: async function () {
      try {
        const { mutate } = useMutation(updateCommentMutation);
        const result = await mutate({
          episodeId: this.episodeId,
          commentId: this.comment._id,
          content: this.updatedContent,
        });
        if (!result) {
          toast.error("Can't update this comment", toastSettings.error);
          return;
        }
        toast.success("Update comment successfully", toastSettings.success);
        this.comment.content = this.updatedContent;
        this.comment.updated_at = Date.parse(new Date().toLocaleString());
        this.isUpdate = false;
        return;
      } catch (error) {
        console.log(error);
        toast.error("Can't update this comment", toastSettings.error);
        throw error;
      }
    },
  },
};
</script>

<template>
  <section class="flex w-full flex-row gap-x-4">
    <div class="2xl:w-[4.5%] lg:w-[7%] md:w-[8%] sm:w-[12%] w-[13%]">
      <router-link
        :to="`/profile/${
          comment.user.username === currentUser ? `me` : comment.user.username
        }`"
      >
        <img
          :src="avatar"
          class="rounded-full h-full 2xl:max-h-[50px] xl:max-h-[58px] lg:max-h-[100px] md:max-h-[75px] sm:max-h-[65px] max-h-[50px]"
        />
      </router-link>
    </div>
    <div
      class="2xl:w-[95.5%] lg:w-[93%] md:w-[92%] sm:w-[88%] w-[87%] flex flex-col justify-between gap-y-2"
    >
      <div class="text-sm w-full flex justify-between items-start">
        <div>
          <router-link
            :to="`/profile/${
              comment.user.username === currentUser
                ? `me`
                : comment.user.username
            }`"
          >
            <span class="font-bold mr-2"> @{{ comment.user.username }} </span>
          </router-link>
          <span class="text-slate-300">{{
            formatTime(comment.created_at)
          }}</span>
          <span
            v-if="comment.created_at !== comment.updated_at"
            class="ml-1 text-slate-300 italic"
            >{{ `(Edited ${formatTime(comment.updated_at)})` }}</span
          >
        </div>
        <div
          class="flex gap-x-5 flex-row"
          v-if="comment.user.username === currentUser && !isUpdate"
        >
          <font-awesome-icon
            class="cursor-pointer hover:text-secondColor"
            @click="() => deleteComment()"
            size="md"
            icon="fa-solid fa-trash-can"
          />
          <font-awesome-icon
            @click="() => setUpdate(true)"
            class="cursor-pointer hover:text-secondColor"
            icon="fa-solid fa-pen"
            size="md"
          />
        </div>
      </div>
      <p v-if="!isUpdate" :class="!isSeeMore ? 'line-clamp-2' : 'line-clamp-0'">
        {{ comment.content }}
      </p>
      <div v-else>
        <input
          class="rounded p-2 bg-opacityText w-full mb-2 text-white"
          type="text"
          v-model="updatedContent"
        />
        <div class="w-full flex justify-end items-end flex-row gap-x-2">
          <button
            @click="() => setUpdate(false)"
            class="font-bold bg-yellow-500 p-2 rounded-lg hover:bg-yellow-700"
          >
            Cancel
          </button>
          <button
            @click="() => updateComment()"
            class="font-bold bg-green-500 p-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
      <div v-if="!isUpdate && comment.content.length > 500">
        <span
          @click="setSeeMore(isSeeMore)"
          class="hover:cursor-pointer hover:text-slate-200 text-sm text-slate-300"
        >
          {{ !isSeeMore ? "See more" : "See less" }}
        </span>
      </div>
    </div>
  </section>
</template>
