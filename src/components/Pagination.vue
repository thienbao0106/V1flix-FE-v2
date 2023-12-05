<script lang="ts">
export default {
  props: ["currentPage", "totalPage", "type"],
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
    reverseArray: function (requestNum: number) {
      let array = [];
      console.log(this.totalPage);
      if (requestNum > this.totalPage) return [];
      for (let i = this.totalPage; i >= requestNum; i--) {
        console.log(i);
        array.unshift(i);
      }
      console.log(array);
      return array;
    },
  },
};
</script>

<template>
  <section
    class="list-none w-full flex justify-center items-center flex-row gap-x-5"
  >
    <button
      :disabled="currentPage === 1"
      @click="handleNavigation('prev')"
      class="text-white decoration-none disabled:opacity-60"
    >
      <div
        class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-mainColor"
      >
        Prev
      </div>
    </button>
    <router-link
      class="text-white decoration-none"
      v-for="index in 2"
      :key="index"
      :to="`/${type}?page=${index}`"
    >
      <div
        class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer"
        :class="`${index === currentPage ? 'bg-secondColor' : 'bg-gray-500'}`"
      >
        {{ index }}
      </div>
    </router-link>
    <div
      v-if="totalPage > 3"
      class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer flex-0"
    >
      ...
    </div>
    <router-link
      class="text-white decoration-none"
      v-for="index in reverseArray(3)"
      :key="index"
      :to="`/${type}?page=${index}`"
    >
      <div
        class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer"
        :class="`${index === currentPage ? 'bg-secondColor' : 'bg-gray-500'}`"
      >
        {{ index }}
      </div>
    </router-link>
    <button
      :disabled="currentPage === totalPage"
      @click="handleNavigation('next')"
      class="text-white outline-none disabled:opacity-60"
    >
      <div
        class="font-bold text-xl px-4 py-2 rounded-lg hover:bg-secondColor cursor-pointer bg-mainColor"
      >
        Next
      </div>
    </button>
  </section>
</template>
