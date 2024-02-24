<script lang="ts">
import { DEFAULT_IMAGE } from "../../constants/image";
export default {
  props: ["listUser"],
  data() {
    return {
      img: DEFAULT_IMAGE.avatar,
    };
  },
};
</script>
<template>
  <section
    class="border border-white p-2 rounded-lg h-[25rem] overflow-y-auto space-y-2"
  >
    <h1 class="font-bold text-xl">{{ listUser?.length || 6 }} Members</h1>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-2">
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
      <div class="flex flex-col w-full justify-center items-center h-full">
        <img :src="img" alt="avatar" class="rounded-full w-[100px]" />
        <div>Test User</div>
      </div>
    </div>
  </section>
</template>
