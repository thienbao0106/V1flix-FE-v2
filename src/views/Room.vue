<script lang="ts">
import RoomVideo from "../components/Room/RoomVideo.vue";
import { useQuery } from "@vue/apollo-composable";
import { getEpisode } from "../queries/episodes";
import Chatbox from "../components/Room/Chatbox.vue";
import Members from "../components/Room/Members.vue";

export default {
  data() {
    return {
      roomId: this.$route.params.roomId,
      episodeId: this.$route.query.episodeId || "",
      episode: {},
      loading: false,
      isShow: true,
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
  components: { RoomVideo, Chatbox, Members },
};
</script>

<template>
  <main class="text-white p-2 max-h-full">
    <h1>Room Id: {{ roomId }}</h1>
    <section class="w-full flex lg:flex-row flex-col lg:gap-x-5">
      <div :class="!isShow ? 'lg:w-[80%] w-full' : 'w-full'">
        <RoomVideo :set-show="setShow" :episode="episode" />
      </div>
      <div v-if="!isShow" class="lg:w-[20%] w-full flex flex-col gap-y-2">
        <section class="max-h-[3/5]">
          <Chatbox />
        </section>
        <section class="max-h-[2/5]">
          <Members />
        </section>
      </div>
    </section>
  </main>
</template>
