<script lang="ts">
import { DEFAULT_IMAGE } from "../../constants/image";

export default {
  props: ["username", "avatar"],
  data() {
    return {
      userAvatar: this.avatar === "" ? DEFAULT_IMAGE.avatar : this.avatar,
    };
  },
};
</script>

<template>
  <router-link
    :to="`/profile/${username}`"
    class="border border-white rounded-md px-2 py-3 flex flex-row gap-x-5 justify-start items-center hover:bg-mainColor"
  >
    <img
      :src="userAvatar"
      :alt="`avatar_${username}`"
      class="w-[50px] rounded"
    />
    <p class="font-bold text-lg truncate">{{ username }}</p>
  </router-link>
</template>
