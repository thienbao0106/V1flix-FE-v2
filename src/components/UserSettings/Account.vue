<script lang="ts">
import { updateProfileUser } from "../../queries/users";
import { useMutation } from "@vue/apollo-composable";

export default {
  data() {
    return {
      tempImg: "",
    };
  },
  props: ["account"],
  methods: {
    displayImage: function (e) {
      const file = e.target.files[0];
      this.tempImg = URL.createObjectURL(file);
    },
    clearImage: function () {
      const imageInput = document.querySelector("#avatar");
      if (!imageInput) return;
      imageInput.value = "";
      this.tempImg = "";
    },
    handleSubmit: async function (e) {
      try {
        e.preventDefault();
        const { username, avatar } = e.target.elements;
        const userAvatar = avatar.files[0];
        const { mutate } = useMutation(updateProfileUser);
        console.log(this.account);
        await mutate({
          email: username.value,
          userId: this.account._id,
        });
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="space-y-4">
    <h1 class="font-bold text-2xl">Account</h1>
    <form methods="post" @submit="handleSubmit" class="space-y-5">
      <div
        class="flex lg:flex-row lg:justify-between lg:h-[230px] h-[250px] space-y-3 flex-col"
      >
        <div>
          <h2 class="text-lg font-bold mb-1">Avatar</h2>
          <p class="mb-6 italic">
            Allowed Formats: JPEG, PNG. Max size: 3mb. Optimal dimensions:
            230x230
          </p>
          <button
            @click="clearImage"
            class="mr-4 p-2 bg-red-500 rounded font-bold"
            type="button"
          >
            Clear Image
          </button>
          <input
            @change="displayImage"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
          />
        </div>
        <div class="lg:mb-0 mb-3">
          <img
            v-if="tempImg !== ''"
            :src="tempImg"
            alt="temp-img"
            class="max-w-[230px] max-h-[230px]"
          />
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-lg font-bold">Username</h2>
        <input
          type="text"
          name="username"
          class="bg-gray-500 p-2 rounded lg:w-[50%] w-full focus:outline-none placeholder:text-white"
          placeholder="Input your username"
          :value="account.username"
        />
      </div>
      <div>
        <button
          type="submit"
          class="bg-secondColor hover:bg-secondColorBrighter py-2 px-5 rounded font-bold text-xl"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
