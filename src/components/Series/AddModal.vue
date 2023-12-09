<script lang="ts">
import { getImageType } from "../../../utils/handleImage";
import Loading from "../Loading.vue";

export default {
  props: ["series"],
  data() {
    return {
      series: {},
    };
  },
  methods: {
    getImageType,
    closeModal: function () {
      const dialog: any = document.querySelector("#add-modal");
      dialog?.close();
    },
  },
  created() {
    this.$watch(
      () => this.$props.series,
      () => {
        if (Object.keys(this.$props.series).length > 0)
          this.series = this.$props.series;
      },
      { immediate: true }
    );
  },
  components: { Loading },
};
</script>

<template>
  <dialog
    id="add-modal"
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-5 sm:w-3/5 w-full h-[25rem]"
  >
    <div
      :style="{
        backgroundImage: `url(${getImageType(series.images, 'banner')})`,
      }"
      className="bg-center bg-no-repeat h-[9.5rem] rounded-md  w-full  "
    >
      <header class="w-full flex justify-end pt-5">
        <div
          @click="closeModal"
          class="cursor-pointer text-4xl font-bold hover:text-secondColor text-right pr-5 w-fit"
        >
          X
        </div>
      </header>
      <div
        class="flex sm:flex-row flex-col sm:justify-start justify-center sm:items-start items-center gap-x-5 space-y-5"
      >
        <img
          class="rounded-md w-[14rem] pl-5"
          :src="getImageType(series.images, 'cover')"
          alt="image"
        />
        <div class="flex flex-col space-y-3">
          <h1 class="font-bold text-2xl sm:text-start text-center">
            {{ series.title }}
          </h1>
          <h2 class="text-sm sm:text-start text-center">{{ series.title }}</h2>
          <div
            class="flex gap-x-3 pt-3 sm:justify-start justify-center sm:items-start items-center"
          >
            <button
              class="bg-green-700 hover:bg-green-500 rounded-xl py-2 px-4.5 font-bold"
            >
              Add
            </button>
            <button
              class="bg-yellow-700 hover:bg-yellow-500 rounded-xl py-2 px-4.5 font-bold"
            >
              Edit
            </button>
            <button
              class="bg-red-700 hover:bg-red-500 rounded-xl py-2 px-4.5 font-bold"
            >
              Delete
            </button>
          </div>
          <p class="sm:pl-0 pl-4 pr-4 sm:text-start text-center">
            {{ series.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- <section class="space-y-2">
      <h4>URL</h4>
    </section> -->
  </dialog>
</template>
