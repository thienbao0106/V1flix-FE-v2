export const URL_TYPE = {
  video: "/test/test.mp4",
  keyframe: "/test/merged_image.png",
  subtitles: "/test/test.vtt",
  ggDriveUrl: (id: string, key: string) =>
    `https://www.googleapis.com/drive/v3/files/${id}?key=${key}&alt=media`,
};
