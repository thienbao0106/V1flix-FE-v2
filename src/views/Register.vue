<script lang="ts">
import { capitalizeWord } from "../../utils/handleWord";
import { registerEle } from "../../src/constants/form";
import { useMutation } from "@vue/apollo-composable";
import { createUserMutation } from "../../src/queries/users";
import AccountForm from "../components/AccountForm/AccountForm.vue";
import FormHeader from "../components/AccountForm/FormHeader.vue";
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
  components: { AccountForm, FormHeader },
};
</script>

<template>
  <main class="text-white flex justify-center items-center w-full h-screen">
    <section class="space-y-4 w-fit">
      <aside class="text-center space-y-5">
        <FormHeader title="Register" />
      </aside>
      <aside class="w-full flex justify-center items-center">
        <AccountForm
          :error="error"
          :handle-submit="handleSubmit"
          :form-ele="formEle"
          :loading="loading"
          type="Sign-up"
        />
      </aside>
      <div className="flex justify-center mt-4">
        <p>
          You already have an account? Go
          <router-link
            to="/login"
            className="text-secondColor font-bold hover:text-secondColorBrighter"
          >
            here
          </router-link>
          to sign-in
        </p>
      </div>
    </section>
  </main>
</template>
