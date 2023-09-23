<script lang="ts">
export default {
  data() {
    return {
      theme: "dark",
    };
  },
  methods: {
    toggleTheme: function (theme: String) {
      this.theme = theme === "dark" ? "light" : "dark";
      return;
    },
  },
};
</script>

<template>
  <nav
    class="sticky top-0 bg-bgColor bg-gradient-to-b from-black to-transparent z-20 flex items-center justify-center gap-5 text-white py-7 px-5"
  >
    <section class="flex-none w-1/6">Logo</section>
    <section class="flex-1 w-2/6">Genres</section>

    <section
      aria-label="search"
      class="flex flex-row w-3/6 h-12 text-white gap-10"
    >
      <aside aria-label="input" className="flex flex-row">
        <div
          class="flex justify-center items-center bg-gray-500 bg-opacity-40 px-2 py-4 rounded-md no-underline text-white gap-3"
        >
          <a
            href="/search"
            class="no-underline text-white hover:text-secondColorBrighter flex justify-between items-center"
          >
            <span class="pi pi-search"></span>
          </a>
          <input
            type="text"
            class="bg-transparent w-xl px-2 focus:outline-none caret-transparent border-0 text-white placeholder:text-white placeholder:font-bold"
            placeholder="Search"
            value=""
          />
        </div>
      </aside>
      <div class="flex justify-center items-center">
        <i
          @click="toggleTheme(theme)"
          class="pi text-2xl cursor-pointer hover:text-secondColorBrighter"
          :class="theme === 'dark' ? 'pi-sun' : 'pi-moon'"
        ></i>
      </div>
      <a
        href="/login"
        className="flex justify-center items-center bg-transparent outline outline-offset-2 outline-outColor text-white py-2 rounded-lg px-2 w-full no-underline"
      >
        Login
      </a>
    </section>
  </nav>
</template>
