<script lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

//Queries
import { updateProfileUser } from "../../queries/users";
//Utils
import { uploadToCloudinary } from "../../utils/handleImage";
import { toastSettings } from "../../utils/toastSettings";
//Components
import Loading from "../Loading.vue";

export default {
  data() {
    return {
      tempImg: "",
      error: "",
    };
  },
  props: ["account"],
  mounted() {
    this.tempImg = this.account.avatar;
  },
  methods: {
    displayImage: function (e: any) {
      const file = e.target.files[0];
      this.tempImg = URL.createObjectURL(file);
    },
    clearImage: function () {
      const imageInput: any = document.querySelector("#avatar");
      if (!imageInput) return;
      imageInput.value = "";
      this.tempImg = "";
    },
    handleSubmit: async function (e: any) {
      try {
        e.preventDefault();
        const { username, avatar, password, rePassword } = e.target.elements;
        if (password.value !== "" && password.value !== rePassword.value) {
          this.error = "Your password doesn't match";
          return;
        }
        const userAvatar: any = avatar.files[0];
        const { mutate } = useMutation(updateProfileUser);
        const urlImg: string = await uploadToCloudinary(userAvatar);
        const newInfo =
          password.value !== ""
            ? {
                username: username.value,
                userId: this.account._id,
                avatar: urlImg,
                password: password.value,
              }
            : {
                username: username.value,
                userId: this.account._id,
                avatar: urlImg,
              };
        await mutate(newInfo);
        window.localStorage.setItem("username", username.value);
        toast.success("Add successfully", toastSettings.success);
        window.location.reload();
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
  components: { Loading },
};
</script>

<template>
  <div class="space-y-4">
    <h1 class="font-bold text-2xl">Account</h1>
    <form methods="post" @submit="handleSubmit" class="space-y-5">
      <div
        class="flex lg:flex-row lg:justify-between lg:h-[230px] h-[350px] space-y-3 flex-col"
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
          <div
            v-else
            class="w-[230px] h-[230px] flex justify-center items-center font-bold text-lg ring-2 ring-secondColor/50"
          >
            Image section here
          </div>
        </div>
      </div>
      <section class="lg:pt-0 pt-8">
        <div class="space-y-3 lg:pt-0 pb-3">
          <h2 class="text-lg font-bold">Username</h2>

          <input
            type="text"
            name="username"
            class="bg-gray-500 p-2 rounded lg:w-[50%] w-full focus:outline-none placeholder:text-white"
            placeholder="Input your username"
            :value="account.username"
          />
          <p class="italic text-sm">
            Try to reclaiming your username? Check here
          </p>
        </div>
        <div class="space-y-3 lg:pt-0 pb-3">
          <h2 class="text-lg font-bold">Email</h2>
          <input
            type="email"
            disabled
            name="email"
            class="disabled:bg-gray-700 p-2 rounded lg:w-[50%] w-full focus:outline-none placeholder:text-white"
            placeholder="Input your username"
            :value="account.email"
          />
        </div>

        <div class="space-y-3">
          <h2 class="text-lg font-bold">Change password</h2>
          <div class="space-y-3 lg:pt-0 pb-3">
            <input
              type="password"
              name="password"
              class="bg-gray-500 p-2 rounded lg:w-[50%] w-full focus:outline-none placeholder:text-white"
              placeholder="Input your password"
            />
          </div>
          <div class="space-y-3 lg:pt-0 pb-3">
            <input
              type="password"
              name="rePassword"
              class="bg-gray-500 p-2 rounded lg:w-[50%] w-full focus:outline-none placeholder:text-white"
              placeholder="Retype your password"
            />
          </div>
        </div>
      </section>
      <p class="text-red-500 font-bold text-lg" v-if="error != ''">
        {{ error }}
      </p>
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
