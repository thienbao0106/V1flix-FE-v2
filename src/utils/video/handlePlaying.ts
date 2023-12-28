export function handleVideoPlaying(
  videoContainerRef: HTMLDivElement | undefined
) {
  if (!videoContainerRef) return;
  videoContainerRef.classList.remove("paused");
}

export function handleVideoPause(
  videoContainerRef: HTMLDivElement | undefined
) {
  if (!videoContainerRef) return;
  videoContainerRef.classList.add("paused");
}
