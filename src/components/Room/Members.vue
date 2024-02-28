<script lang="ts">
import { DEFAULT_IMAGE } from "../../constants/image";
export default {
  props: ["listUser", "isHost"],
  data() {
    return {
      img: DEFAULT_IMAGE.avatar,
    };
  },
};
</script>
<template>
  <section
    class="border border-white p-2 rounded-lg h-[15rem] overflow-y-auto space-y-2"
  >
    <h1 class="font-bold text-xl">{{ listUser.length }} Members</h1>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="user in listUser"
        class="flex flex-col w-full justify-center items-center h-full"
      >
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div class="w-full flex flex-row justify-center items-center gap-x-2">
          {{ user.username }}
          <span
            class="bg-secondColor rounded-lg py-1 px-2 font-bold"
            v-if="user.isHost"
          >
            Host
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
