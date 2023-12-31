export const URL_TYPE = {
  video: "/test/test.mp4",
  keyframe: "/test/merged_image.png",
  subtitles: "/test/test.vtt",
};

export const VIDEO_QUERIES: any = {
  video: [
    "images { \n source \n type \n }",
    "_id",
    "description",
    "title {\n main_title \n alt_title \n}",
    "type",
    "view",
    "total_episodes",
    "status",
    "favors",
    "episodes { \n _id \n source { \n kind \n value \n } \n epNum \n title \n keyframe { \n kind \n value \n } \n created_at \n view \n subtitles { \n lang \n source { \n kind \n value \n } \n label \n } \n }",
    "genres { \n _id \n name \n}",
    "duration",
  ],
  search: [
    "images { \n source \n type \n }",
    "_id",
    "description",
    "title {\n main_title \n alt_title \n}",
    "type",
    "view",
    "total_episodes",
    "status",
  ],
  headerSearch: [
    "_id",
    "images { \n source \n type \n }",
    "duration",
    "view",
    "total_episodes",
    "type",
    "title {\n main_title \n }",
  ],
};
