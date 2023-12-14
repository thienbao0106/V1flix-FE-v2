<script lang="ts">
export default {
  data() {
    return {
      isCollapse: window.innerWidth < 1024 ? false : true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    toggleList: function (isCollapse: boolean) {
      this.isCollapse = !isCollapse;
    },
    onResize: function () {
      if (window.innerWidth < 1024) return;
      if (this.isCollapse === false) this.isCollapse = true;
    },
  },
  props: ["count", "typeList", "setCurrentType"],
};
</script>

<template>
  <section class="lg:w-1/5 w-full lg:mb-0 mb-5">
    <div class="flex flex-row justify-between items-center w-full">
      <h1 class="font-bold text-xl">Lists</h1>
      <button
        @click="toggleList(isCollapse)"
        class="bg-mainColor lg:invisible visible text-white hover:bg-secondColor font-bold rounded-lg"
      >
        <font-awesome-icon
          v-if="!isCollapse"
          icon="fa-solid fa-arrow-down"
          class="px-3 py-1.5"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-arrow-up"
          class="px-3 py-1.5"
        />
      </button>
    </div>
    <ul v-if="isCollapse" class="pt-5">
      <li
        v-for="(type, index) in typeList"
        class="hover:bg-secondColor hover:cursor-pointer hover:font-bold py-3 px-3"
        @click="setCurrentType(type)"
      >
        <div class="flex flex-row justify-between items-center">
          <span>
            {{ type }}
          </span>
          <span> {{ count[index] }} </span>
        </div>
      </li>
    </ul>
  </section>
</template>
