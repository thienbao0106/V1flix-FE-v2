export const URL_TYPE = {
  video: "/test/test.mp4",
  keyframe: "/test/merged_image.png",
  subtitles: "/test/test.vtt",
};

export const QUERIES: any = {
  video: [
    "images { \n source \n type \n }",
    "_id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",

    "episodes { \n _id \n source { \n kind \n value \n } \n epNum \n title \n keyframe { \n kind \n value \n } \n created_at \n view \n subtitles { \n lang \n source { \n kind \n value \n } \n label \n } \n }",
    "genres { \n _id \n name \n}",
  ],
  search: [
    "images { \n source \n type \n }",
    "_id",
    "description",
    "title",
    "type",
    "view",
    "total_episodes",
    "status",
  ],
};
