import { getSource, loadedData } from "./getSource";
import {
  togglePlay,
  toggleMute,
  toggleFullScreenMode,
  toggleMiniPlayerMode,
  toggleTheatherMode,
  toggleCaption,
  toggleScrubbing,
  toggleSettings,
} from "./toggleVideo";
import { handleTimeUpdate, handleTimelineUpdate } from "./handleTimeline";
import { handleVideoPlaying, handleVideoPause } from "./handlePlaying";
import { handleVolumeSlider, handleChangingVolume } from "./handleVolume";
import { checkSource, formatDuration, handlePercent } from "./handleVideo";
import { setSubtitle } from "./handleSubtitle";
import { changePlaybackSpeed } from "./handlePlayback";
import { handleKeydown } from "./handleKeydown";
import { convertToTimestamp, historyTimeline } from "./handleTime";

export default {
  historyTimeline,
  checkSource,
  formatDuration,
  handlePercent,
  getSource,
  togglePlay,
  toggleMute,
  toggleFullScreenMode,
  toggleMiniPlayerMode,
  toggleTheatherMode,
  toggleCaption,
  toggleScrubbing,
  toggleSettings,
  handleTimeUpdate,
  handleTimelineUpdate,
  handleVideoPlaying,
  handleVolumeSlider,
  handleChangingVolume,
  handleVideoPause,
  loadedData,
  setSubtitle,
  changePlaybackSpeed,
  handleKeydown,
  convertToTimestamp,
};
