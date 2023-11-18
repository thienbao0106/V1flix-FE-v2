import { createCanvas } from "canvas";
import { formatDuration, handlePercent } from "./handleVideo";

export function handleTimeUpdate(
  timelineContainerRef: HTMLDivElement | undefined,
  videoRef: HTMLVideoElement | undefined,
  currentTimeElemRef: HTMLDivElement | undefined
) {
  if (!timelineContainerRef || !videoRef || !currentTimeElemRef) return;
  currentTimeElemRef.textContent = formatDuration(videoRef.currentTime);
  const percent = videoRef.currentTime / videoRef.duration;
  timelineContainerRef.style.setProperty(
    "--progress-position",
    percent.toString()
  );
}

export function handleTimelineUpdate(
  timelineContainerRef: HTMLDivElement | undefined,
  videoRef: HTMLVideoElement | undefined,
  previewImgRef: HTMLImageElement | undefined,
  thumbnailImgRef: HTMLImageElement | undefined,
  videoContainerRef: HTMLDivElement | undefined,
  currentTimeElemRef: HTMLDivElement | undefined,
  previewTimeRef: HTMLDivElement | undefined,
  settingBoxRef: HTMLDivElement | undefined,
  isScrubbing: boolean,
  e: any,
  keyframe: any,
  frames: any
) {
  if (
    !timelineContainerRef ||
    !videoRef ||
    !previewImgRef ||
    !thumbnailImgRef ||
    !videoContainerRef ||
    !currentTimeElemRef ||
    !previewTimeRef ||
    !settingBoxRef
  )
    return;
  console.log("test");
  const rect = timelineContainerRef.getBoundingClientRect();
  const imgRect = previewImgRef.getBoundingClientRect();
  let imgSrc = "";
  let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  if (keyframe) {
    const previewImgNumber = Math.max(
      1,
      Math.floor(percent * videoRef.duration * 2.36)
    ).toString();
    //Temp location
    imgSrc = frames[previewImgNumber];
  } else {
    const canvas: any = createCanvas(100, 50);
    const context = canvas.getContext("2d");
    context.drawImage(videoRef, 0, 0, imgRect.width * 2.2, imgRect.height * 2);
    imgSrc = canvas.toDataURL();
  }

  //Handle when user scrubs and video container is still playing
  if (!settingBoxRef.classList.contains("hidden")) {
    previewImgRef.classList.remove("preview-img");
    previewImgRef.classList.add("hidden");
    previewTimeRef.classList.add("hidden");
  } else {
    previewImgRef.classList.add("preview-img");
    previewImgRef.classList.remove("hidden");
    previewTimeRef.classList.remove("hidden");
  }
  const timeline = formatDuration(percent * videoRef.duration);

  previewImgRef.src = imgSrc;
  previewTimeRef.textContent = timeline;

  const finalPercent = handlePercent(rect.width, percent);
  previewImgRef.style.setProperty("--preview-position", finalPercent);
  previewTimeRef.style.setProperty("--preview-position", finalPercent);
  previewTimeRef.textContent = timeline;

  if (isScrubbing) {
    e.preventDefault();
    let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    currentTimeElemRef.textContent = timeline;
    previewTimeRef.textContent = timeline;

    previewImgRef.src = imgSrc;
    timelineContainerRef.style.setProperty(
      "--progress-position",
      percent.toString()
    );
  }
}
