<script lang="ts">
import { useQuery, useMutation } from "@vue/apollo-composable";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {
  getUser,
  addSeriesMutation,
  removeSeriesMutation,
  editSeriesMutation,
} from "../../queries/users";
import { rateSeries } from "../../queries/series";
import { toastSettings } from "../../utils/toastSettings";
import { getImageType } from "../../utils/handleImage";

import { USER_QUERIES } from "../../constants/user";
import Loading from "../Loading/Loading.vue";

export default {
  props: ["series", "currentEp", "reload", "setUserStatus"],
  data() {
    return {
      series: {},
      isInList: null as any,
      userId: "",
      status: "default",
      note: "",
      currentEp: 0,
      score: 0,
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

        if (this.currentEp > this.series.episodes.length) {
          toast.error(
            "Current episode isn't greater than total episode",
            toastSettings.error
          );
          return;
        }

        const { mutate } = useMutation(addSeriesMutation);
        mutate({
          seriesId: this.series._id,
          note: this.note,
          currentEp: parseInt(this.currentEp),
          status: this.status,
          userId: this.userId,
        });
        await this.updateScore();
        toast.success("Add successfully", toastSettings.success);
        this.isInList = true;
        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
        if (this.reload) this.$router.go(0);
      } catch (error) {
        console.log(error);
        toast.error("Add failed", toastSettings.error);
      }
    },
    deleteSeries: function () {
      try {
        const wantDelete: boolean = confirm(
          "Do you want to remove this out your list?"
        );
        if (!wantDelete) return;
        const { mutate } = useMutation(removeSeriesMutation);
        mutate({
          seriesId: this.series._id,
          userId: this.userId,
        });
        toast.success("Remove successfully", toastSettings.error);
        this.isInList = false;
        this.note = "";
        this.status = "default";
        this.score = 0;

        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
        if (this.reload) this.$router.go(0);
      } catch (error) {
        console.log(error);
        toast.error("Remove failed", toastSettings.error);
      }
    },
    updateSeries: async function () {
      try {
        if (this.score < 0) throw Error("Score can't be lower than 1.");
        if (this.status === "default") {
          toast.error("Status shouldn't be emptied", toastSettings.error);
          return;
        }
        if (this.currentEp > this.series.total_episodes) {
          toast.error(
            "Current episode isn't greater than total episode",
            toastSettings.error
          );
          return;
        }
        const { mutate } = useMutation(editSeriesMutation);
        mutate({
          seriesId: this.series._id,
          note: this.note,
          currentEp: parseInt(this.currentEp),
          status: this.status,
          userId: this.userId,
        });
        const currentScore = this.series.rating.find((rate: any) => {
          return rate.user.username === window.localStorage.getItem("username");
        });
        if (this.score !== currentScore) {
          await this.updateScore();
        }
        toast.success("Edit successfully", toastSettings.success);
        const dialog: any = document.querySelector("#add-modal");
        dialog?.close();
        if (this.reload) this.$router.go(0);
      } catch (error) {
        console.log(error);
        toast.error("Edit failed", toastSettings.error);
      }
    },
    closeModal: function () {
      const dialog: any = document.querySelector("#add-modal");
      dialog?.close();
    },
    updateScore: function () {
      try {
        const { mutate } = useMutation(rateSeries);
        mutate({
          seriesId: this.series._id,
          userId: this.userId,
          score: this.score,
        });
      } catch (error) {
        toast.error("Add score failed", toastSettings.error);
        throw error;
      }
    },
  },
  created() {
    this.$watch(
      () => this.$props.series,
      () => {
        console.log(this.$props.series);
        if (Object.keys(this.$props.series).length > 0) {
          this.series = this.$props.series;
          this.score =
            this.series.rating.find((rate: any) => {
              return (
                rate.user.username === window.localStorage.getItem("username")
              );
            })?.score || 0;
        }
      },
      { immediate: true }
    );
    this.$watch(
      () => [this.status],
      () => {
        if (this.status === "completed")
          this.currentEp = this.series.total_episodes;
      },
      { immediate: true }
    );
    this.$watch(
      () => [this.series._id],
      () => {
        const username = window.localStorage.getItem("username") || "";
        const { onResult } = useQuery(
          getUser(USER_QUERIES.modal, username),
          {},
          {
            fetchPolicy: "no-cache",
          }
        );
        onResult((result) => {
          if (!result.data) return;
          const {
            findUserByName: { list, _id },
          } = result.data;
          const { _id: seriesId } = this.series;

          const filteredArr = list.filter((item: any) => {
            return item.series._id === seriesId;
          });
          this.userId = _id;
          this.isInList = filteredArr.length > 0;
          if (filteredArr.length > 0) {
            this.status = filteredArr[0].status;
            if (this.setUserStatus) this.setUserStatus(this.status);
            this.note = filteredArr[0].note;
            this.currentEp = filteredArr[0].currentEp;
          } else {
            this.status = "default";
            this.note = "";
            this.currentEp = 0;
            this.score = 0;
          }
        });
      },
      { immediate: true }
    );
  },
  mounted() {
    const dialog: any = document.querySelector("#add-modal");
    if (!dialog) return;
    dialog.addEventListener("click", (e: any) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
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
          class="cursor-pointer text-4xl font-bold hover:text-secondColor text-right pr-5 w-fit drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        >
          X
        </div>
      </header>
      <div
        class="flex lg:flex-row flex-col lg:justify-start justify-center lg:items-start items-center gap-x-5 space-y-5 pb-5"
      >
        <img
          class="rounded-md w-[14rem] pl-5 shadow-md"
          :src="getImageType(series.images, 'cover')"
          alt="image"
        />
        <div class="flex flex-col space-y-3 w-full">
          <h1 class="font-bold text-2xl lg:text-start text-center">
            {{ series.title.main_title }}
          </h1>

          <h2 class="text-sm lg:text-start text-center">
            {{ series.title.alt_title }}
          </h2>
          <div
            class="flex lg:flex-row flex-col lg:gap-y-0 gap-y-4 gap-x-3 pt-3 lg:justify-start justify-center lg:items-start items-center"
          >
            <div
              class="flex flex-col lg:justify-start lg:items-start justify-center items-center lg:w-[10rem] w-[20rem] space-y-2"
            >
              <h1 class="font-bold">Status</h1>
              <select
                v-model="status"
                class="text-white p-2 rounded-lg bg-opacityText w-full"
              >
                <option value="default" disabled>Select your status</option>
                <option value="completed">Completed</option>
                <option value="watching">Watching</option>
                <option value="on-hold">On-hold</option>
                <option value="plans to watch">Plans to watch</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
            <div
              class="flex flex-col lg:justify-start lg:items-start justify-center items-center lg:w-[15rem] w-[20rem] space-y-2"
            >
              <h1 class="font-bold">Note</h1>
              <input
                type="text"
                v-model="note"
                placeholder="Note"
                class="w-full text-white p-2 rounded-lg bg-opacityText"
              />
            </div>
            <div
              class="flex flex-col lg:justify-start lg:items-start justify-center items-center lg:w-[10rem] w-[20rem] space-y-2 lg:-mb-0 -mb-5"
            >
              <h1 class="font-bold">Current Episode</h1>
              <input
                type="text"
                inputmode="numeric"
                oninput="this.value = this.value.replace(/\D+/g, '')"
                v-model="currentEp"
                placeholder="Episodes"
                class="w-full text-white p-2 rounded-lg bg-opacityText"
              />
            </div>
            <div
              class="flex gap-x-3 flex-col lg:justify-start lg:items-start justify-center items-center lg:w-[10rem] w-[20rem] space-y-2"
            >
              <div class="select-none">&nbsp;</div>
              <div
                class="flex lg:flex-row flex-col w-full h-full lg:gap-x-3 gap-y-3"
              >
                <button
                  v-if="!isInList"
                  class="lg:w-fit w-full bg-green-700 hover:bg-green-500 rounded-xl py-2 px-4.5 font-bold"
                  @click="addSeries()"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" class="pr-2" />
                  Add
                </button>
                <button
                  v-if="isInList"
                  class="lg:w-fit w-full bg-yellow-700 hover:bg-yellow-500 rounded-xl py-2 px-4.5 font-bold"
                  @click="updateSeries()"
                >
                  Edit
                </button>
                <button
                  v-if="isInList"
                  @click="deleteSeries()"
                  class="lg:w-fit w-full bg-red-700 hover:bg-red-500 rounded-xl py-2 px-4.5 font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex lg:flex-row flex-col lg:justify-start lg:items-end justify-center items-center space-y-2 w-full gap-x-2"
          >
            <div class="lg:w-[14rem] w-[20rem]">
              <h1 class="font-bold lg:text-start text-center lg:mb-2 mb-0">
                Score
              </h1>
              <input
                type="number"
                v-model="score"
                placeholder="Add score"
                max="10"
                min="1"
                class="w-full text-white p-2 rounded-lg bg-opacityText"
              />
            </div>
          </div>
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
