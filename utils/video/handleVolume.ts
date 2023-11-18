export function handleVolumeSlider(
  e: any,
  videoRef: HTMLVideoElement | undefined
) {
  if (!videoRef) return;
  videoRef.volume = e.target.value;
  videoRef.muted = e.target.value === 0;
}

export function handleChangingVolume(
  volumeSliderRef: HTMLInputElement | undefined,
  videoRef: HTMLVideoElement | undefined,
  videoContainerRef: HTMLDivElement | undefined
) {
  if (!volumeSliderRef || !videoRef || !videoContainerRef) return;
  volumeSliderRef.value = videoRef.volume.toString();
  let volumeLevel: string = "";
  if (videoRef.muted || videoRef.volume === 0) {
    volumeSliderRef.value = "0";
    volumeLevel = "muted";
  } else if (videoRef.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }
  videoContainerRef.dataset.volumeLevel = volumeLevel;
}
