<script lang="ts">
import RoomVideo from "../components/Room/RoomVideo.vue";
import { useQuery } from "@vue/apollo-composable";
import { getEpisode } from "../queries/episodes";
import Chatbox from "../components/Room/Chatbox.vue";
import Members from "../components/Room/Members.vue";
import { io } from "socket.io-client";
import Loading from "../components/Loading.vue";
import InfoRoom from "../components/Room/InfoRoom.vue";

export default {
  data() {
    return {
      roomId: this.$route.params.roomId,
      hostRoom: this.$route.query.host || "",
      episodeId: this.$route.query.episodeId || "",
      episode: {} as any,
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
        this.episode = result.data.findEpisode;
        this.loading = false;
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
        const url = import.meta.env.DEV
          ? "http://localhost:3306/"
          : import.meta.env.VITE_V1FLIX_API_URL;
        this.socket = io(url, {
          autoConnect: true,
        });

        this.socket.on("connect", () => {
          console.log("called");
          this.socket.emit(
            "join",
            {
              username: this.currentUser,
              isHost: this.hostRoom === "true",
            },
            this.roomId
          );
        });
        this.socket.on("listUser", (data: any) => {
          this.listUser = data;
          console.log(data);
        });
      },
      { immediate: true }
    );
  },

  components: { RoomVideo, Chatbox, Members, Loading, InfoRoom },
};
</script>

<template>
  <Loading v-if="loading" message="Getting data" />
  <main v-else class="text-white p-2 max-h-full">
    <div
      class="w-full bg-mainColor rounded-lg lg:text-center text-left p-2 text-lg mb-3"
    >
      This feature is still in beta. Any problem is expected.
    </div>
    <section class="w-full flex lg:flex-row flex-col xl:gap-x-5 gap-y-5">
      <div class="space-y-4" :class="!isShow ? 'lg:w-[80%] w-full' : 'w-full'">
        <Loading v-if="listUser.length < 2" message="Waiting more people" />
        <RoomVideo
          v-else
          :is-host="hostRoom"
          :set-show="setShow"
          :episode="episode"
          :socket="socket"
        />
        <InfoRoom
          v-if="Object.keys(episode).length > 0"
          :episode="episode"
          :room-id="roomId"
        />
      </div>
      <div v-show="!isShow" class="lg:w-[20%] w-full flex flex-col gap-y-2">
        <section class="max-h-[2/5]">
          <Members :list-user="listUser" :is-host="hostRoom" />
        </section>
        <section class="max-h-[3/5]">
          <Chatbox
            :socket="socket"
            :current-user="currentUser"
            :is-host="hostRoom"
          />
        </section>
      </div>
    </section>
  </main>
</template>
