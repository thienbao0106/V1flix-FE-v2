<script lang="ts">
import handleVideo from "../../utils/video/index";
import { URL_TYPE } from "../../constants/video";
import { ref } from "vue";
export default {
  props: ["episode", "setShow", "isHost", "socket"],

  setup() {
    const videoRef = ref<HTMLVideoElement>();
    return {
      isDevEnv: import.meta.env.DEV,
      videoRef,
      isPlaying: true,
    };
  },
  methods: {
    getSource: function () {
      return this.isDevEnv
        ? URL_TYPE.video
        : handleVideo.checkSource(this.episode.source);
    },
    handleSocket: function (isPlay: boolean, currentTime?: any) {
      console.log(isPlay);
      this.socket.emit("userVideo", isPlay, currentTime);
    },
    checkSubtitleSource: handleVideo.checkSource,
    handleVideo: function () {
      if (!this.videoRef) return;

      if (!this.videoRef.paused) {
        this.videoRef.play();
        const currentTime = this.videoRef.currentTime;
        this.handleSocket(true, currentTime);
        return;
      }

      if (this.videoRef.paused) {
        this.videoRef.pause();
        const currentTime = this.videoRef.currentTime;
        this.handleSocket(false, currentTime);
        return;
      }
    },
  },
  mounted() {
    //First load video

    this.socket.on("playingVideo", (isPlaying: any, currentTime: any) => {
      if (!this.videoRef || this.isHost === "true") return;
      console.log(isPlaying);
      if (!isPlaying) {
        this.videoRef.pause();
        this.videoRef.onpause = () => {};
        this.videoRef.onplay = () => {
          this.videoRef?.pause();
        };
        this.videoRef.currentTime = currentTime;
        return;
      }

      this.videoRef.play();
      this.videoRef.onpause = () => {
        this.videoRef?.play();
      };
      this.videoRef.onplay = () => {};
      this.videoRef.currentTime = currentTime;
      return;
    });
  },
};
</script>

<template>
  <main v-if="Object.keys(episode).length > 0" class="flex flex-col gap-y-3">
    <div>
      <video
        @play="() => handleVideo()"
        @pause="() => handleVideo()"
        ref="videoRef"
        class="w-full h-full rounded-lg"
        preload="metadata"
        controls
        crossorigin="anonymous"
        controlslist="nodownload"
        width="1280"
        height="760"
      >
        <source :src="getSource()" type="video/mp4" />
        <track
          v-for="sub in episode.subtitles"
          :id="sub.label"
          :label="sub.label"
          kind="subtitles"
          :srclang="sub.lang"
          :src="checkSubtitleSource(sub.source)"
        />
      </video>
    </div>
    <div class="text-2xl flex justify-between">
      <div>
        Episode
        <span class="font-bold">{{ episode.epNum }}</span>
        -
        <span class="font-bold">{{ episode.title }}</span>
      </div>
      <div class="cursor-pointer" @click="() => setShow()">
        <font-awesome-icon icon="fa-solid fa-expand" />
      </div>
    </div>
  </main>
</template>
