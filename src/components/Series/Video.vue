<script lang="ts">
import { ref } from "vue";
import {
  checkSource,
  formatDuration,
  handlePercent,
} from "../../../utils/handleVideo";
import { createCanvas } from "canvas";
import { URL_TYPE } from "../../constants/video.ts";

import Loading from "../Loading.vue";
import Settings from "./Settings.vue";

export default {
  props: ["source", "time", "subtitles", "setTheaterMode", "keyframe"],
  data() {
    return {
      isCompleted: false,
      frames: [] as any,
      currentSubtitle:
        this.subtitles.find((sub: any) => sub.lang === "en") ||
        this.subtitles[0],
      isDevEnv: import.meta.env.DEV,
    };
  },
  created() {
    this.$watch(
      () => this.$data.isCompleted,
      () => {
        if (this.isCompleted && this.keyframe !== "") {
          const container: any = document.querySelector("#container");
          if (!container) return;
          container.style.visibility = "visible";
          this.handleRenderVideo();
        }
      },
      { immediate: true }
    );
  },
  setup(props) {
    const videoRef = ref<HTMLVideoElement>();
    const speedBtnRef = ref<HTMLButtonElement>();
    const currentTimeElemRef = ref<HTMLDivElement>();
    const totalTimeElemRef = ref<HTMLDivElement>();
    const previewImgRef = ref<HTMLImageElement>();
    const thumbnailImgRef = ref<HTMLImageElement>();
    const volumeSliderRef = ref<HTMLInputElement>();
    const videoContainerRef = ref<HTMLDivElement>();
    const timelineContainerRef = ref<HTMLDivElement>();
    const settingBoxRef = ref<HTMLDivElement>();
    const previewTimeRef = ref<HTMLDivElement>();
    return {
      captions: {} as any,
      wasPaused: null as any,
      isScrubbing: false,
      videoRef,
      speedBtnRef,
      currentTimeElemRef,
      totalTimeElemRef,
      previewImgRef,
      thumbnailImgRef,
      volumeSliderRef,
      videoContainerRef,
      timelineContainerRef,
      settingBoxRef,
      previewTimeRef,
      source: checkSource(props.source),
      keyframe: checkSource(props.keyframe),
    };
  },
  mounted() {
    if (!document || !this.videoRef) return;

    this.videoRef.currentTime = parseFloat(this.time || 0);

    if (this.keyframe !== "") {
      this.cutImage(this.keyframe);
    } else {
      const container: any = document.querySelector("#container");
      if (!container) return;
      container.style.visibility = "visible";
      this.handleRenderVideo();
    }
  },
  methods: {
    getSource: function () {
      return this.isDevEnv
        ? { video: URL_TYPE.video, subtitle: URL_TYPE.subtitles }
        : {
            video: this.source,
            subtitle:
              this.subtitles.length > 0
                ? checkSource(this.currentSubtitle.source)
                : "",
          };
    },
    handleRenderVideo: function () {
      if (
        !document ||
        !this.timelineContainerRef ||
        !this.videoRef ||
        !this.videoContainerRef
      )
        return;
      if (this.subtitles.length > 0) {
        this.captions = this.videoRef.textTracks[0];
        this.captions.mode = "hidden";
      }
      //Handle keydown
      document.addEventListener("keydown", (e: any) => {
        const tagName = document?.activeElement?.tagName.toLowerCase();
        if (tagName === "input") return;
        switch (e.key.toLowerCase()) {
          case " ":
            e.preventDefault();
            this.togglePlay();
            break;
          case "k":
            this.togglePlay();
            break;
          case "f":
            this.toggleFullScreenMode();
            break;
          case "i":
            this.toggleMiniPlayerMode();
            break;
          case "t":
            this.toggleTheaterMode();
            break;
          case "m":
            this.toggleMute();
            break;
          case "c":
            this.toggleCaptions();
            break;
          case "arrowleft":
          case "j":
            this.skip(-5);
            break;
          case "arrowright":
          case "l":
            this.skip(5);
            break;
          default:
            break;
        }
      });
      this.videoContainerRef.addEventListener("mouseup", (e) => {
        if (this.isScrubbing) this.toggleScrubbing(e);
      });
      this.videoContainerRef.addEventListener("mousemove", (e) => {
        if (this.isScrubbing) this.handleTimelineUpdate(e);
      });

      this.videoRef.addEventListener("enterpictureinpicture", () => {
        if (!this.videoContainerRef) return;
        this.videoContainerRef.classList.add("mini-player");
      });
      this.videoRef.addEventListener("leavepictureinpicture", () => {
        if (!this.videoContainerRef) return;
        this.videoContainerRef.classList.remove("mini-player");
      });
      this.videoContainerRef.addEventListener("mouseleave", () => {
        if (!this.settingBoxRef) return;
        if (!this.settingBoxRef.classList.contains("hidden"))
          this.settingBoxRef.classList.add("hidden");
      });
    },
    cutImage: function (imageId: string) {
      console.log(imageId);
      if (imageId === "") return;
      const imageUrl = !this.isDevEnv ? imageId : URL_TYPE.keyframe;
      console.log(imageUrl);
      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Can't load this image");
          return response.blob();
        })
        .then((imageBlob) => {
          return createImageBitmap(imageBlob);
        })
        .then((image: any) => {
          if (!image) return;
          const canvas = createCanvas(100, 50);
          const ctx = canvas.getContext("2d");
          this.frames = []; // Clear previous frames
          const numRows = Math.floor(image.height / 50);
          const numFrames = 10 * numRows;
          for (let i = 0; i < numFrames; i++) {
            const row = Math.floor(i / 10);
            const col = i % 10;
            ctx.drawImage(image, -col * 100, -row * 50);
            const frameDataUrl = canvas.toDataURL("image/png");
            this.frames.push(frameDataUrl);
          }
          this.isCompleted = true;
        });
    },
    togglePlay: function () {
      if (!this.videoRef) return;
      this.videoRef.paused ? this.videoRef.play() : this.videoRef.pause();
    },
    handleVideoPlaying: function () {
      if (!this.videoContainerRef) return;
      this.videoContainerRef.classList.remove("paused");
    },
    loadedData: function () {
      if (!this.totalTimeElemRef || !this.videoRef) return;
      this.totalTimeElemRef.textContent = formatDuration(
        this.videoRef.duration
      );
    },
    handleVideoPause: function () {
      if (!this.videoContainerRef) return;
      this.videoContainerRef.classList.add("paused");
    },
    toggleFullScreenMode: function () {
      document.fullscreenElement === null
        ? this.videoContainerRef?.requestFullscreen()
        : document.exitFullscreen();
    },
    toggleMiniPlayerMode: function () {
      if (!this.videoContainerRef || !document || !this.videoRef) return;
      this.videoContainerRef.classList.contains("mini-player")
        ? document.exitPictureInPicture()
        : this.videoRef.requestPictureInPicture();
    },
    toggleTheaterMode: function () {
      if (!this.videoContainerRef) return;
      const isTheater: boolean = this.videoContainerRef.classList.contains(
        "theater"
      )
        ? true
        : false;
      this.setTheaterMode(!isTheater);
      this.videoContainerRef.classList.toggle("theater");
    },
    toggleMute: function () {
      if (!this.videoRef) return;
      this.videoRef.muted = !this.videoRef.muted;
    },
    handleVolumeSlider: function (e: any) {
      if (!this.videoRef) return;
      this.videoRef.volume = e.target.value;
      this.videoRef.muted = e.target.value === 0;
    },
    handleChangingVolume: function () {
      if (!this.volumeSliderRef || !this.videoRef || !this.videoContainerRef)
        return;
      this.volumeSliderRef.value = this.videoRef.volume.toString();
      let volumeLevel: string = "";
      if (this.videoRef.muted || this.videoRef.volume === 0) {
        this.volumeSliderRef.value = "0";
        volumeLevel = "muted";
      } else if (this.videoRef.volume >= 0.5) {
        volumeLevel = "high";
      } else {
        volumeLevel = "low";
      }
      this.videoContainerRef.dataset.volumeLevel = volumeLevel;
    },
    changePlaybackSpeed: function () {
      if (!this.videoRef || !this.speedBtnRef) return;
      let newPlaybackRate = this.videoRef.playbackRate + 0.25;
      if (newPlaybackRate > 2) newPlaybackRate = 0.25;
      this.videoRef.playbackRate = newPlaybackRate;
      this.speedBtnRef.textContent = `${newPlaybackRate}x`;
    },
    toggleCaptions: function () {
      if (!this.videoContainerRef) return;
      const isHidden = this.captions.mode === "hidden";
      this.captions.mode = isHidden ? "showing" : "hidden";
      this.videoContainerRef.classList.toggle("captions", isHidden);
      console.log(isHidden);
    },
    skip: function (duration: number) {
      if (!this.videoRef) return;
      this.videoRef.currentTime += duration;
    },
    handleTimeUpdate: function () {
      if (
        !this.timelineContainerRef ||
        !this.videoRef ||
        !this.currentTimeElemRef
      )
        return;
      this.currentTimeElemRef.textContent = formatDuration(
        this.videoRef.currentTime
      );
      const percent = this.videoRef.currentTime / this.videoRef.duration;
      this.timelineContainerRef.style.setProperty(
        "--progress-position",
        percent.toString()
      );
    },
    toggleScrubbing: function (e: any) {
      if (
        !this.timelineContainerRef ||
        !this.videoContainerRef ||
        !this.videoRef
      )
        return;
      const rect = this.timelineContainerRef.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      this.isScrubbing = (e.buttons & 1) === 1;
      this.videoContainerRef.classList.toggle("scrubbing", this.isScrubbing);
      if (this.isScrubbing) {
        this.wasPaused = this.videoRef.paused;
        this.videoRef.pause();
      } else {
        this.videoRef.currentTime = percent * this.videoRef.duration;
        if (!this.wasPaused) this.videoRef.play();
      }
      this.handleTimelineUpdate(e);
    },
    handleTimelineUpdate: function (e: any) {
      if (
        !this.timelineContainerRef ||
        !this.videoRef ||
        !this.previewImgRef ||
        !this.timelineContainerRef ||
        !this.thumbnailImgRef ||
        !this.videoContainerRef ||
        !this.currentTimeElemRef ||
        !this.previewTimeRef ||
        !this.settingBoxRef
      )
        return;

      const rect = this.timelineContainerRef.getBoundingClientRect();
      const imgRect = this.previewImgRef.getBoundingClientRect();
      let imgSrc = "";
      let percent =
        Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

      if (this.keyframe) {
        const previewImgNumber = Math.max(
          1,
          Math.floor(percent * this.videoRef.duration * 2.36)
        ).toString();
        //Temp location
        imgSrc = this.frames[previewImgNumber];
      } else {
        const canvas: any = createCanvas(100, 50);
        const context = canvas.getContext("2d");
        context.drawImage(
          this.videoRef,
          0,
          0,
          imgRect.width * 2.2,
          imgRect.height * 2
        );
        imgSrc = canvas.toDataURL();
      }

      //Handle when user scrubs and video container is still playing
      if (!this.settingBoxRef.classList.contains("hidden")) {
        this.previewImgRef.classList.remove("preview-img");
        this.previewImgRef.classList.add("hidden");
        this.previewTimeRef.classList.add("hidden");
      } else {
        this.previewImgRef.classList.add("preview-img");
        this.previewImgRef.classList.remove("hidden");
        this.previewTimeRef.classList.remove("hidden");
      }
      const timeline = formatDuration(percent * this.videoRef.duration);

      this.previewImgRef.src = imgSrc;
      this.previewTimeRef.textContent = timeline;

      const finalPercent = handlePercent(rect.width, percent);
      this.previewImgRef.style.setProperty("--preview-position", finalPercent);
      this.previewTimeRef.style.setProperty("--preview-position", finalPercent);
      this.previewTimeRef.textContent = timeline;

      if (this.isScrubbing) {
        e.preventDefault();
        let percent =
          Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
        this.currentTimeElemRef.textContent = timeline;
        this.previewTimeRef.textContent = timeline;

        this.previewImgRef.src = imgSrc;
        this.timelineContainerRef.style.setProperty(
          "--progress-position",
          percent.toString()
        );
      }
    },
    toggleSettings: function () {
      if (!this.settingBoxRef) return;
      this.settingBoxRef.classList.toggle("hidden");
    },
    setSubtitle: function (subtitle: any) {
      console.log(subtitle);
      this.currentSubtitle = subtitle;
      if (!this.settingBoxRef) return;
      this.settingBoxRef.classList.add("hidden");
    },
  },
  components: { Loading, Settings },
};
</script>
<template>
  <div v-if="!isCompleted && keyframe !== ''" class="h-[100px]">
    <Loading message="Getting the video" />
  </div>

  <section id="container" style="visibility: hidden">
    <div
      ref="videoContainerRef"
      class="video-container paused w-full"
      data-volume-level="high"
    >
      <img ref="thumbnailImgRef" class="thumbnail-img" />
      <div class="video-controls-container">
        <div
          @mousemove="handleTimelineUpdate"
          @mousedown="toggleScrubbing"
          ref="timelineContainerRef"
          class="timeline-container"
        >
          <div class="timeline">
            <img ref="previewImgRef" class="preview-img" />
            <div ref="previewTimeRef" class="time-preview"></div>
            <!-- <div class="thumb-indicator"></div> -->
          </div>
        </div>
        <div class="controls">
          <button @click="togglePlay" class="play-pause-btn">
            <svg class="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg class="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div class="volume-container">
            <button @click="toggleMute" class="mute-btn">
              <svg class="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg class="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg class="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              ref="volumeSliderRef"
              class="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value="1"
              @input="handleVolumeSlider"
            />
          </div>
          <div class="duration-container">
            <div ref="currentTimeElemRef" class="current-time">0:00</div>
            /
            <div ref="totalTimeElemRef" class="total-time"></div>
          </div>
          <button @click="toggleCaptions" class="captions-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>
          <button @click="toggleSettings">
            <font-awesome-icon icon="fa-solid fa-gear" />
          </button>
          <button
            @click="changePlaybackSpeed"
            ref="speedBtnRef"
            class="speed-btn wide-btn"
          >
            1x
          </button>
          <button @click="toggleMiniPlayerMode" class="mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          <button @click="toggleTheaterMode" class="theater-btn">
            <svg class="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg class="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button>
          <button @click="toggleFullScreenMode" class="full-screen-btn">
            <svg class="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg class="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
        <div ref="settingBoxRef" class="hidden">
          <Settings
            :list-languages="subtitles"
            :set-subtitle="setSubtitle"
            v-if="subtitles.length > 0"
            :current-subtitle="currentSubtitle.label"
          />
        </div>
      </div>
      <video
        @play="handleVideoPlaying"
        @pause="handleVideoPause"
        @click="togglePlay"
        @loadeddata="loadedData"
        @volumechange="handleChangingVolume"
        @timeupdate="handleTimeUpdate"
        ref="videoRef"
        preload="metadata"
        crossorigin="anonymous"
      >
        <source :src="getSource().video" type="video/mp4" />
        <track
          v-if="subtitles.length > 0"
          :label="currentSubtitle.label"
          kind="subtitles"
          :srclang="currentSubtitle.lang"
          :src="getSource().subtitle"
        />

        This video type can't be supported
      </video>
    </div>
  </section>
</template>

<style src="./video.css" scoped></style>
