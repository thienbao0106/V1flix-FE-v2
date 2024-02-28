<script lang="ts">
import RoomVideo from "../components/Room/RoomVideo.vue";
import { useQuery } from "@vue/apollo-composable";
import { getEpisode } from "../queries/episodes";
import Chatbox from "../components/Room/Chatbox.vue";
import Members from "../components/Room/Members.vue";
import { io } from "socket.io-client";
import Loading from "../components/Loading.vue";

export default {
  data() {
    return {
      roomId: this.$route.params.roomId,
      hostRoom: this.$route.query.host || "",
      episodeId: this.$route.query.episodeId || "",
      episode: {},
      loading: false,
      isShow: false,
      listUser: [] as any,
      socket: null as any,
      currentUser: window.localStorage.getItem("username") || "",
    };
  },
  methods: {
    setShow: function () {
      this.isShow = !this.isShow;
      console.log(this.isShow);
    },
    fetchEpisode: function () {
      console.log(this.episodeId);
      this.loading = true;
      const { onResult } = useQuery(getEpisode(this.episodeId));
      onResult((result) => {
        if (!result.data) return;
        this.loading = false;
        this.episode = result.data.findEpisode;
      });
    },
  },

  mounted() {
    this.fetchEpisode();
  },
  created() {
    this.$watch(
      () => this.roomId,
      () => {
        const url = !import.meta.env.DEV
          ? "http://localhost:3306/"
          : import.meta.env.VITE_V1FLIX_API_URL;
        this.socket = io(url, {
          autoConnect: true,
        });

        this.socket.on("connect", () => {
          console.log("called");
          this.socket.emit("join", this.currentUser, this.roomId);
        });
        this.socket.on("listUser", (data: any) => {
          this.listUser = data;
          console.log(data);
        });
      },
      { immediate: true }
    );
  },

  components: { RoomVideo, Chatbox, Members, Loading },
};
</script>

<template>
  <Loading v-if="loading" message="Getting data" />
  <main v-else class="text-white p-2 max-h-full">
    <h1>Room Id: {{ roomId }}</h1>
    <section class="w-full flex lg:flex-row flex-col lg:gap-x-5">
      <div :class="!isShow ? 'lg:w-[80%] w-full' : 'w-full'">
        <Loading v-if="listUser.length < 2" message="Waiting more people" />
        <RoomVideo
          v-else
          :is-host="hostRoom"
          :set-show="setShow"
          :episode="episode"
          :socket="socket"
        />
      </div>
      <div v-show="!isShow" class="lg:w-[20%] w-full flex flex-col gap-y-2">
        <section class="max-h-[3/5]">
          <Chatbox :socket="socket" :current-user="currentUser" />
        </section>
        <section class="max-h-[2/5]">
          <Members :list-user="listUser" />
        </section>
      </div>
    </section>
  </main>
</template>
