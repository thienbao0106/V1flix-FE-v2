<script lang="ts">
import moment from "moment";
export default {
  props: ["comment"],
  setup(props) {
    console.log(props.comment);
  },
  methods: {
    formatTime: function (time: any) {
      return moment(time).fromNow();
    },
  },
};
</script>

<template>
  <section class="flex w-full flex-row justify-start gap-x-2 items-start h-fit">
    <div class="xl:w-[5%] w-[10%]">
      <img :src="comment.user.avatar" class="rounded-full" />
    </div>
    <div class="xl:w-[95%] w-[90%] flex flex-col justify-between">
      <div class="text-sm">
        <span class="font-bold mr-2"> @{{ comment.user.username }} </span>
        <span class="text-slate-300">{{ formatTime(comment.created_at) }}</span>
      </div>
      <div>{{ comment.content }}</div>
    </div>
  </section>
</template>
