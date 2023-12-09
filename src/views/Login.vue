<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { userLogin } from "../queries/users";

export default {
  data() {
    return {
      inputClass:
        "xl:w-[30rem] sm:w-[28rem] w-[24rem] rounded-md h-12 border-2 bg-opacity-40 bg-gray-500 p-3 focus:outline-none focus:border-secondColorBrighter",
      spanClass:
        "pointer-events-none font-bold absolute left-0 p-3 transition-transform duration-500",
      theme: "dark",
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  setup() {
    document.title = "Login";
  },
  methods: {
    toggleTheme: function (theme: string) {
      this.theme = theme === "dark" ? "light" : "dark";
      return;
    },
    handleSubmit: function (e: any) {
      this.loading = true;
      e.preventDefault();
      console.log(this.password);
      const { onResult } = useQuery(
        userLogin(this.email, this.password),
        {},
        {
          fetchPolicy: "no-cache",
        }
      );

      onResult((result) => {
        if (!result.data) {
          this.error =
            "Your password isn't matched or your account doesn't exist.";
          this.loading = false;
          return;
        }
        console.log("called");
        if (this.error !== "") this.error = "";
        const { username, token } = result.data.login;
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("token", token);
        window.location.href = "/";
      });
    },
  },
};
</script>

<template>
  <main class="text-white flex justify-center items-center w-full h-screen">
    <section class="space-y-4 w-fit">
      <aside class="text-center space-y-5">
        <h1 className="font-bold text-4xl">Login</h1>
        <div
          className=" w-full flex flex-row w-full h-fit items-center justify-between"
        >
          <span className="hover:cursor-pointer ">
            <svg
              v-if="theme === 'dark'"
              @click="toggleTheme(theme)"
              class="sun-icon w-full"
              viewBox="0 0 20 20"
            >
              <path
                fill="none"
                d="M5.114,5.726c0.169,0.168,0.442,0.168,0.611,0c0.168-0.169,0.168-0.442,0-0.61L3.893,3.282c-0.168-0.168-0.442-0.168-0.61,0c-0.169,0.169-0.169,0.442,0,0.611L5.114,5.726z M3.955,10c0-0.239-0.193-0.432-0.432-0.432H0.932C0.693,9.568,0.5,9.761,0.5,10s0.193,0.432,0.432,0.432h2.591C3.761,10.432,3.955,10.239,3.955,10 M10,3.955c0.238,0,0.432-0.193,0.432-0.432v-2.59C10.432,0.693,10.238,0.5,10,0.5S9.568,0.693,9.568,0.932v2.59C9.568,3.762,9.762,3.955,10,3.955 M14.886,5.726l1.832-1.833c0.169-0.168,0.169-0.442,0-0.611c-0.169-0.168-0.442-0.168-0.61,0l-1.833,1.833c-0.169,0.168-0.169,0.441,0,0.61C14.443,5.894,14.717,5.894,14.886,5.726 M5.114,14.274l-1.832,1.833c-0.169,0.168-0.169,0.441,0,0.61c0.168,0.169,0.442,0.169,0.61,0l1.833-1.832c0.168-0.169,0.168-0.442,0-0.611C5.557,14.106,5.283,14.106,5.114,14.274 M19.068,9.568h-2.591c-0.238,0-0.433,0.193-0.433,0.432s0.194,0.432,0.433,0.432h2.591c0.238,0,0.432-0.193,0.432-0.432S19.307,9.568,19.068,9.568 M14.886,14.274c-0.169-0.168-0.442-0.168-0.611,0c-0.169,0.169-0.169,0.442,0,0.611l1.833,1.832c0.168,0.169,0.441,0.169,0.61,0s0.169-0.442,0-0.61L14.886,14.274z M10,4.818c-2.861,0-5.182,2.32-5.182,5.182c0,2.862,2.321,5.182,5.182,5.182s5.182-2.319,5.182-5.182C15.182,7.139,12.861,4.818,10,4.818M10,14.318c-2.385,0-4.318-1.934-4.318-4.318c0-2.385,1.933-4.318,4.318-4.318c2.386,0,4.318,1.933,4.318,4.318C14.318,12.385,12.386,14.318,10,14.318 M10,16.045c-0.238,0-0.432,0.193-0.432,0.433v2.591c0,0.238,0.194,0.432,0.432,0.432s0.432-0.193,0.432-0.432v-2.591C10.432,16.238,10.238,16.045,10,16.045"
              ></path>
            </svg>

            <svg
              v-else
              @click="toggleTheme(theme)"
              class="moon-icon"
              viewBox="0 0 20 20"
            >
              <path
                fill="none"
                d="M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"
              ></path>
            </svg>
          </span>
          <span className="hover:cursor-pointer ">
            <a
              class="text-white decoration-none hover:text-secondColor"
              href="/"
            >
              <font-awesome-icon size="xl" icon="house" />
            </a>
          </span>
        </div>
      </aside>

      <aside class="w-full flex justify-center items-center">
        <form method="post" @submit="handleSubmit" class="space-y-5">
          <div className="relative">
            <input
              :class="`${inputClass} border-secondColor`"
              type="email"
              v-model.lazy="email"
              required
            />

            <span :class="`${spanClass}`">Email</span>
          </div>
          <div className="relative">
            <input
              type="password"
              :class="`${inputClass} border-secondColor`"
              required
              v-model.lazy="password"
            />
            <span :class="`${spanClass}`">Password</span>
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
            {{ loading ? "Loading..." : "Log-in" }}
          </button>
        </form>
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

<style scoped>
input:valid ~ span,
input:focus ~ span {
  color: white;
  font-size: 0.65em;
  transform: translateX(10px) translateY(-7px);
  padding: 0 5px;
  background: #1d2b3a;
  border-left: 1px solid #e89b26;
  border-right: 1px solid #e89b26;
  letter-spacing: 0.2em;
}

.sun-icon {
  width: 2rem;
  height: 2rem;
}

.sun-icon path,
.sun-icon polygon,
.sun-icon rect {
  fill: white;
}

.sun-icon circle {
  stroke: white;
  stroke-width: 1;
}

.moon-icon {
  width: 2rem;
  height: 2rem;
}

.moon-icon path,
.moon-icon polygon,
.moon-icon rect {
  fill: white;
}

.moon-icon circle {
  stroke: white;
  stroke-width: 1;
}
</style>
