import { Source } from "../../src/types/video";
import { URL_TYPE } from "./../../src/constants/video";
import { handleTimelineUpdate } from "./handleTimeline";
import { checkSource, formatDuration } from "./handleVideo";

export function getSource(
  isDevEnv: boolean,
  source: any,
  subtitles: any,
  currentSubtitle: any
): Source {
  return isDevEnv
    ? { video: URL_TYPE.video, subtitle: URL_TYPE.subtitles }
    : {
        video: source,
        subtitle:
          subtitles.length > 0 ? checkSource(currentSubtitle.source) : "",
      };
}

export function loadedData(
  totalTimeElemRef: HTMLDivElement | undefined,
  videoRef: HTMLVideoElement | undefined
) {
  if (!totalTimeElemRef || !videoRef) return;
  totalTimeElemRef.textContent = formatDuration(videoRef.duration);
}
