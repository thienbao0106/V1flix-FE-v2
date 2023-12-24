<script lang="ts">
export default {
  props: ["currentPage", "totalPage", "type"],
  data() {
    return {
      pageNum: 0,
      isPage: false,
    };
  },
  methods: {
    handleNavigation: function (type: string) {
      console.log("called");
      console.log(this.currentPage);
      this.$router.push(
        `/${this.type}?page=${
          type === "next" ? this.currentPage + 1 : this.currentPage - 1
        }`
      );
    },
    reverseArray: function () {
      let array = [];
      for (let i = this.totalPage; i >= this.totalPage - 1; i--) {
        array.unshift(i);
      }
      return array;
    },
    togglePageInput: function () {
      this.isPage = true;
      window.addEventListener("click", (e: any) => {
        const pageNumBox: any = document.getElementById("pageNumInput");
        if (!pageNumBox) return;
        if (!pageNumBox.contains(e.target)) {
          this.isPage = false;
          this.$router.push(
            `/${this.type}?page=${
              this.pageNum > this.totalPage
                ? this.totalPage
                : this.pageNum <= 0
                ? 1
                : this.pageNum
            }`
          );
        }
      });
    },
  },
};
</script>

<template>
  <section
    class="list-none w-full flex justify-center items-center flex-row lg:gap-x-5 gap-x-2 lg:pt-0 pt-5"
  >
    <button
      :disabled="currentPage === 1"
      @click="handleNavigation('prev')"
      class="text-white decoration-none disabled:opacity-60 font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-transparent"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-white" />
    </button>
    <router-link
      class="text-white decoration-none font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer"
      :class="`${index === currentPage ? 'bg-secondColor' : 'bg-transparent'}`"
      v-for="index in 2"
      :key="index"
      :to="`/${type}?page=${index}`"
    >
      {{ index }}
    </router-link>
    <div
      v-if="totalPage > 3"
      class="font-bold text-xl px-4 py-2 rounded-lg cursor-pointer flex-0"
      :class="`${isPage ? `` : `hover:bg-secondColor`}`"
      @click="togglePageInput"
      id="pageNumInput"
    >
      <input
        type="text"
        v-if="isPage"
        inputmode="numeric"
        oninput="this.value = this.value.replace(/\D+/g, '')"
        v-model="pageNum"
        placeholder="Pages"
        class="text-white px-4 py-2 lg:w-full w-[6rem] rounded-lg text-center bg-opacityText"
      />
      <div class="text-white" v-else>...</div>
    </div>
    <router-link
      class="text-white decoration-none font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer"
      :class="`${index === currentPage ? 'bg-secondColor' : 'bg-transparent'}`"
      v-if="totalPage > 3"
      v-for="index in reverseArray()"
      :key="index"
      :to="`/${type}?page=${index}`"
    >
      {{ index }}
    </router-link>
    <button
      :disabled="currentPage === totalPage"
      @click="handleNavigation('next')"
      class="text-white outline-none disabled:opacity-60 font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-transparent"
    >
      <font-awesome-icon
        icon="fa-solid fa-arrow-right "
        size="md"
        class="text-white"
      />
    </button>
  </section>
</template>
