<script lang="ts">
import { capitalizeWord } from "../../utils/handleWord";
import { registerEle } from "../../src/constants/form";
import { useMutation } from "@vue/apollo-composable";
import { createUserMutation } from "../../src/queries/users";
export default {
  mounted() {
    document.title = "Register";
  },
  data() {
    return {
      inputClass:
        "xl:w-[30rem] sm:w-[28rem] w-[24rem] rounded-md h-12 border-2 bg-opacity-40 bg-gray-500 p-3 focus:outline-none focus:border-secondColorBrighter",
      spanClass:
        "pointer-events-none font-bold absolute left-0 p-3 transition-transform duration-500",
      loading: false,
      formEle: registerEle,
      error: "",
    };
  },
  methods: {
    capitalizeWord,
    handleSubmit: async function (e: any) {
      e.preventDefault();
      const { username, password, email, cPassword } = e.target.elements;
      if (cPassword.value !== password.value) {
        this.error = "Confirmed password doesn't match with current password";
        return;
      }

      const { mutate } = useMutation(createUserMutation);
      try {
        const isSuccess: any = await mutate({
          username: username.value,
          password: password.value,
          email: email.value,
        });
        if (isSuccess.data) {
          alert("You've created successfully");
          this.$router.push("/login");
          return;
        }
        this.error = "Can't create your account";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <main class="text-white flex justify-center items-center w-full h-screen">
    <section class="space-y-4 w-fit">
      <aside class="text-center space-y-5">
        <h1 className="font-bold text-4xl">Register</h1>
      </aside>
      <aside class="w-full flex justify-center items-center">
        <form method="post" @submit="handleSubmit" class="space-y-5">
          <div v-for="ele in formEle" className="relative">
            <input
              :class="`${inputClass} border-secondColor`"
              :type="ele.type"
              :name="ele.name"
              required
            />
            <span :class="`${spanClass}`">{{ capitalizeWord(ele.title) }}</span>
          </div>
          <aside v-if="error !== ''">
            <p class="text-red-500 font-bold w-full">
              {{ error }}
            </p>
          </aside>
          <button
            class="disabled:opacity-70 text-white bg-secondColor hover:bg-secondColorBrighter py-2 text-2xl rounded-md font-bold cursor-pointer w-full text-center"
            type="submit"
            :disabled="loading"
          >
            {{ loading ? "Loading..." : "Create" }}
          </button>
        </form>
      </aside>
    </section>
  </main>
</template>

<style src="./styles/login-register.css" scoped></style>
