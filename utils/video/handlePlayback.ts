export function changePlaybackSpeed(
  videoRef: HTMLVideoElement | undefined,
  speedBtnRef: HTMLButtonElement | undefined
) {
  if (!videoRef || !speedBtnRef) return;
  let newPlaybackRate = videoRef.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  videoRef.playbackRate = newPlaybackRate;
  speedBtnRef.textContent = `${newPlaybackRate}x`;
}
