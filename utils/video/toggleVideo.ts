export function togglePlay(videoRef: HTMLVideoElement | undefined) {
  if (!videoRef) return;
  videoRef.paused ? videoRef.play() : videoRef.pause();
}

export function toggleFullScreenMode(
  videoContainerRef: HTMLDivElement | undefined
) {
  if (!videoContainerRef) return;
  document.fullscreenElement === null
    ? videoContainerRef.requestFullscreen()
    : document.exitFullscreen();
}
export function toggleMiniPlayerMode(
  videoContainerRef: HTMLDivElement | undefined,
  videoRef: HTMLVideoElement | undefined
) {
  if (!videoContainerRef || !document || !videoRef) return;
  videoContainerRef.classList.contains("mini-player")
    ? document.exitPictureInPicture()
    : videoRef.requestPictureInPicture();
}
export function toggleTheatherMode(
  videoContainerRef: HTMLDivElement | undefined,
  setTheaterMode: any
) {
  if (!videoContainerRef) return;
  const isTheater: boolean = videoContainerRef.classList.contains("theater")
    ? true
    : false;
  setTheaterMode(!isTheater);
  videoContainerRef.classList.toggle("theater");
}

export function toggleMute(videoRef: HTMLVideoElement | undefined) {
  if (!videoRef) return;
  videoRef.muted = !videoRef.muted;
}

export function toggleCaption(
  videoContainerRef: HTMLDivElement | undefined,
  captions: any
) {
  if (!videoContainerRef) return;
  const isHidden = captions.mode === "hidden";
  captions.mode = isHidden ? "showing" : "hidden";
  videoContainerRef.classList.toggle("captions", isHidden);
}

export function toggleScrubbing(
  wasPaused: any,
  isScrubbing: any,
  e: any,
  timelineContainerRef: HTMLDivElement | undefined,
  videoContainerRef: HTMLDivElement | undefined,
  videoRef: HTMLVideoElement | undefined,
  handleTimelineUpdate: any
) {
  if (!timelineContainerRef || !videoContainerRef || !videoRef) return;
  const rect = timelineContainerRef.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  videoContainerRef.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = videoRef.paused;
    videoRef.pause();
  } else {
    videoRef.currentTime = percent * videoRef.duration;
    if (!wasPaused) videoRef.play();
  }
  handleTimelineUpdate(e);
}

export function toggleSettings(settingBoxRef: HTMLDivElement | undefined) {
  if (!settingBoxRef) return;
  settingBoxRef.classList.toggle("hidden");
}
