<script lang="ts">
import { DEFAULT_IMAGE } from "../../constants/image";

export default {
  props: [
    "toggleUserMenu",
    "isHoverUsername",
    "avatar",
    "username",
    "handleLogout",
  ],
  data(props) {
    console.log(props.avatar);
    return {
      defaultAvatar: DEFAULT_IMAGE.avatar,
    };
  },
};
</script>

<template>
  <p
    id="username"
    @click="toggleUserMenu(isHoverUsername)"
    class="hover:text-secondColor w-fit hover:cursor-pointer"
  >
    {{ username }}
  </p>
  <div
    class="absolute py-5 xl:-bottom-[15rem] lg:-bottom-[17rem] md:-bottom-[22rem] sm:-bottom-[18rem] -bottom-[15rem] bg-mainColor left-0 right-0 w-full flex flex-col rounded-lg px-2"
    v-if="isHoverUsername"
  >
    <div class="flex flex-col justify-center items-center w-full mb-6">
      <img
        class="mb-4 w-1/2 h-1/2 rounded-lg"
        :src="avatar === '' ? defaultAvatar : avatar"
      />
      <h2 class="decoration-none text-white hover:text-secondColor">
        <router-link :to="`/profile/me`">
          {{ username }}
        </router-link>
      </h2>
    </div>

    <hr />
    <ul class="space-y-3 pt-3">
      <li
        @click="handleLogout()"
        class="hover:text-secondColor hover:cursor-pointer"
      >
        Logout
      </li>
      <li class="hover:text-secondColor hover:cursor-pointer">
        <router-link to="/settings"> Setting </router-link>
      </li>
    </ul>
  </div>
</template>
