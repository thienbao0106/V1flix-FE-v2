<script lang="ts">
import { useQuery, useMutation } from "@vue/apollo-composable";

import { getImageType } from "../../../utils/handleImage";
import { getUser, addSeriesMutation } from "../../queries/users";
import Loading from "../Loading.vue";

export default {
  props: ["series", "currentEp"],
  data() {
    return {
      series: {},
      isInList: null as any,
      userId: "",
      status: "default",
      note: "",
    };
  },

  methods: {
    getImageType,
    addSeries: function () {
      const { mutate } = useMutation(addSeriesMutation);
      mutate({
        seriesId: this.series._id,
        note: this.note,
        currentEp: parseInt(this.currentEp),
        status: this.status,
        userId: this.userId,
      });
    },
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
    this.$watch(
      () => this.series._id,
      () => {
        console.log(this.series._id);
        const username = window.localStorage.getItem("username") || "";
        const { result, onResult } = useQuery(
          getUser(
            ["_id", "list { \n series { \n _id \n } \n status \n note \n }"],
            username
          )
        );
        console.log(result.value);
        onResult((result) => {
          if (!result.data) return;
          const {
            findUserByName: { list, _id },
          } = result.data;
          const { _id: seriesId } = this.series;

          const filteredArr = list.filter(
            (item: any) => item.series._id === seriesId
          );
          this.userId = _id;
          this.isInList = filteredArr.length > 0;
          if (filteredArr.length > 0) {
            this.status = filteredArr[0].status;
            this.note = filteredArr[0].note;
          } else {
            this.status = "default";
            this.note = "";
          }
        });
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
          class="rounded-md w-[14rem] pl-5 shadow-md"
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
            <select
              v-model="status"
              class="w-[15rem] text-white p-2 rounded-lg bg-opacityText"
            >
              <option value="default" disabled>Select your status</option>
              <option value="completed">completed</option>
              <option value="watching">watching</option>
            </select>
            <input
              type="text"
              v-model="note"
              placeholder="Your note"
              class="w-[20rem] text-white p-2 rounded-lg bg-opacityText"
            />

            <button
              v-if="!isInList"
              class="bg-green-700 hover:bg-green-500 rounded-xl py-2 px-4.5 font-bold"
              @click="addSeries()"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="pr-2" />
              Add
            </button>
            <button
              v-if="isInList"
              class="bg-yellow-700 hover:bg-yellow-500 rounded-xl py-2 px-4.5 font-bold"
            >
              Edit
            </button>
            <button
              v-if="isInList"
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
  </dialog>
</template>

<style scoped>
h1,
h2 {
  text-shadow: 0.7px 0.7px 1px black;
}
</style>
