<script lang="ts">
export default {
  props: ["title"],
  data() {
    return {
      isUser: window.localStorage.getItem("username"),
    };
  },
  methods: {
    navigateSeries: function () {
      this.$router.push(`/watch/${this.title}?ep=1`);
    },
    toggleModal: function () {
      const dialog: any = document.querySelector(`#add-modal`);
      if (!dialog) return;
      console.log("called");
      dialog.showModal();
    },
  },
};
</script>

<template>
  <div
    class="flex gap-x-3 lg:flex-col flex-row lg:justify-start lg:items-start justify-center items-center gap-y-3 mt-3"
  >
    <button
      @click="navigateSeries()"
      class="text-white bg-green-700 p-3 rounded-lg font-bold hover:bg-green-500 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-play" class="mr-2" />
      Play
    </button>
    <button
      v-if="isUser"
      @click="toggleModal()"
      class="text-white bg-gray-700 p-3 rounded-lg font-bold hover:bg-gray-500 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-list" class="mr-2" />
      List
    </button>
    <button
      class="text-white bg-red-500 p-3 rounded-lg font-bold hover:bg-red-700 w-full"
    >
      <font-awesome-icon icon="fa-solid fa-flag" class="mr-2" />

      Report
    </button>
  </div>
</template>
