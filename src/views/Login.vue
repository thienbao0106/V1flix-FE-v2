<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { userLogin } from "../queries/users";
import { loginEle } from "../../src/constants/form";
import { capitalizeWord } from "../utils/handleWord";

import FormHeader from "../components/AccountForm/FormHeader.vue";
import AccountForm from "../components/AccountForm/AccountForm.vue";

export default {
  data() {
    return {
      inputClass:
        "xl:w-[30rem] sm:w-[28rem] w-[24rem] rounded-md h-12 border-2 bg-opacity-40 bg-gray-500 p-3 focus:outline-none focus:border-secondColorBrighter",
      spanClass:
        "pointer-events-none font-bold absolute left-0 p-3 transition-transform duration-500",
      theme: "dark",
      formEle: loginEle,
      loading: false,
      error: "",
    };
  },
  setup() {
    document.title = "Login";
  },
  beforeMount() {
    const isLoggedIn = window.localStorage.getItem("username");
    if (!isLoggedIn) return;
    window.location.href = "/";
  },
  methods: {
    capitalizeWord,
    toggleTheme: function (theme: string) {
      this.theme = theme === "dark" ? "light" : "dark";
      return;
    },
    handleSubmit: function (e: any) {
      e.preventDefault();
      this.loading = true;
      const { password, email } = e.target.elements;
      const { onResult, onError } = useQuery(
        userLogin(email.value, password.value),
        {},
        {
          fetchPolicy: "no-cache",
        }
      );
      onResult((result) => {
        if (!result.data) {
          this.error =
            "Your password isn't matched or your account doesn't exist.";
          return;
        }
        console.log("called");
        if (this.error !== "") this.error = "";
        const { username, token, avatar } = result.data.login;
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("avatar", avatar);
        window.location.href = "/";
      });
      onError((error: any) => {
        this.error = error.networkError.result.errors[0].message;
      });
      this.loading = false;
    },
  },
  components: { AccountForm, FormHeader },
};
</script>

<template>
  <main class="text-white flex justify-center items-center w-full h-screen">
    <section class="space-y-4 w-fit">
      <aside class="text-center space-y-5">
        <FormHeader title="Login" />
      </aside>

      <aside class="w-full flex justify-center items-center">
        <AccountForm
          :error="error"
          :handle-submit="handleSubmit"
          :form-ele="formEle"
          :loading="loading"
          type="Login"
        />
      </aside>
      <div className="flex justify-center mt-4">
        <p>
          Don't have an account? Create
          <router-link
            to="/register"
            className="text-secondColor font-bold hover:text-secondColorBrighter"
          >
            here
          </router-link>
        </p>
      </div>
    </section>
  </main>
</template>
