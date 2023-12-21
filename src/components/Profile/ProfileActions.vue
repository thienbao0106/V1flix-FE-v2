<script lang="ts">
import { toast } from "vue3-toastify";
import { toastSettings } from "../../../utils/toastSettings";

export default {
  methods: {
    copyClipboard: function () {
      const { username } = this.$route.params;
      toast.success("Copied successfully", toastSettings.success);
      navigator.clipboard.writeText(
        `${window.location.host}/profile/${
          username === "me" ? window.localStorage.getItem("username") : username
        }`
      );
    },
  },
};
</script>

<template>
  <div
    class="flex gap-x-3 lg:flex-col flex-row lg:justify-start lg:items-start justify-center items-center gap-y-3 mt-3"
  >
    <button
      @click="copyClipboard()"
      class="text-white bg-mainColor p-3 rounded-lg font-bold hover:bg-secondColor w-full"
    >
      <font-awesome-icon icon="fa-solid fa-share" class="mr-2" />
      Profile
    </button>
    <button
      class="text-white bg-red-500 p-3 rounded-lg font-bold hover:bg-red-700 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-flag" class="mr-2" />

      Report
    </button>
  </div>
</template>
