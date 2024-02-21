<script lang="ts">
import moment from "moment";
export default {
  props: ["comment", "currentUser"],
  data() {
    return {
      isSeeMore: false,
    };
  },

  methods: {
    formatTime: function (time: any) {
      return moment(time).fromNow();
    },
    setSeeMore: function (isSeeMore: boolean) {
      this.isSeeMore = !isSeeMore;
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
          :src="comment.user.avatar"
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
        </div>
        <div
          class="flex gap-x-5 flex-row"
          v-if="comment.user.username === currentUser"
        >
          <font-awesome-icon
            class="cursor-pointer hover:text-secondColor"
            size="md"
            icon="fa-solid fa-trash-can"
          />
          <font-awesome-icon
            class="cursor-pointer hover:text-secondColor"
            icon="fa-solid fa-pen"
            size="md"
          />
        </div>
      </div>
      <p :class="!isSeeMore ? 'line-clamp-2' : 'line-clamp-0'">
        {{ comment.content }}
      </p>
      <div v-if="comment.content.length > 500">
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
