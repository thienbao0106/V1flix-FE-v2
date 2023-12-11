<script lang="ts">
import { useQuery, useMutation } from "@vue/apollo-composable";
import { getImageType } from "../../../utils/handleImage";
import {
  getUser,
  addSeriesMutation,
  removeSeriesMutation,
  editSeriesMutation,
} from "../../queries/users";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { toastSettings } from "../../../utils/toastSettings";
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
    addSeries: async function () {
      try {
        if (this.status === "default") {
          toast.error("Status shouldn't be emptied", toastSettings.error);
          return;
        }

        const { mutate } = useMutation(addSeriesMutation);
        await mutate({
          seriesId: this.series._id,
          note: this.note,
          currentEp: parseInt(this.currentEp),
          status: this.status,
          userId: this.userId,
        });
        toast.success("Add successfully", toastSettings.success);
        this.isInList = true;
        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
      } catch (error) {
        console.log(error);
        toast.error("Add failed", toastSettings.error);
      }
    },
    deleteSeries: async function () {
      try {
        const wantDelete: boolean = confirm(
          "Do you want to remove this out your list?"
        );
        if (!wantDelete) return;
        const { mutate } = useMutation(removeSeriesMutation);
        await mutate({
          seriesId: this.series._id,
          userId: this.userId,
        });
        toast.error("Remove successfully", toastSettings.error);
        this.isInList = false;
        this.note = "";
        this.status = "default";
        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
      } catch (error) {
        console.log(error);
        toast.error("Remove failed", toastSettings.error);
      }
    },
    updateSeries: async function () {
      try {
        if (this.status === "default") {
          toast.error("Status shouldn't be emptied", toastSettings.error);
          return;
        }

        const { mutate } = useMutation(editSeriesMutation);
        await mutate({
          seriesId: this.series._id,
          note: this.note,
          currentEp: parseInt(this.currentEp),
          status: this.status,
          userId: this.userId,
        });
        toast.success("Edit successfully", toastSettings.success);
        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
      } catch (error) {
        console.log(error);
        toast.error("Edit failed", toastSettings.error);
      }
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
      () => [this.series._id],
      () => {
        const username = window.localStorage.getItem("username") || "";
        const { onResult } = useQuery(
          getUser(
            ["_id", "list { \n series { \n _id \n } \n status \n note \n }"],
            username
          )
        );
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
    class="rounded-md border-none drop-shadow text-white bg-mainColor outline-none m-auto space-y-5 xl:w-3/5 w-full h-[25rem]"
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
        class="flex lg:flex-row flex-col lg:justify-start justify-center lg:items-start items-center gap-x-5 space-y-5"
      >
        <img
          class="rounded-md w-[14rem] pl-5 shadow-md"
          :src="getImageType(series.images, 'cover')"
          alt="image"
        />
        <div class="flex flex-col space-y-3 w-full">
          <h1 class="font-bold text-2xl lg:text-start text-center">
            {{ series.title }}
          </h1>
          <h2 class="text-sm lg:text-start text-center">{{ series.title }}</h2>
          <div
            class="flex lg:flex-row flex-col lg:gap-y-0 gap-y-4 gap-x-3 pt-3 lg:justify-start justify-center lg:items-start items-center"
          >
            <select
              v-model="status"
              class="lg:w-[15rem] w-[20rem] text-white p-2 rounded-lg bg-opacityText"
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
              class="lg:w-fit w-[20rem] bg-green-700 hover:bg-green-500 rounded-xl py-2 px-4.5 font-bold"
              @click="addSeries()"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="pr-2" />
              Add
            </button>
            <button
              v-if="isInList"
              class="lg:w-fit w-[20rem] bg-yellow-700 hover:bg-yellow-500 rounded-xl py-2 px-4.5 font-bold"
              @click="updateSeries()"
            >
              Edit
            </button>
            <button
              v-if="isInList"
              @click="deleteSeries()"
              class="lg:w-fit w-[20rem] bg-red-700 hover:bg-red-500 rounded-xl py-2 px-4.5 font-bold"
            >
              Delete
            </button>
          </div>
          <p class="lg:pl-0 pl-4 pr-4 lg:text-start text-center">
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
