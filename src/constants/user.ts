import { VIDEO_QUERIES } from "./video";

export const USER_QUERIES = {
  profile: [
    "_id",
    "avatar",
    "username",
    `list { \n series { ${VIDEO_QUERIES["search"].join(
      " \n "
    )} } \n status \n note \n currentEp \n }`,
    `stats { \n total_episodes \n days_watched \n }`,
    `favoriteList { \n ${VIDEO_QUERIES["search"].join(" \n ")} \n }`,
  ],
  modal: [
    "_id",
    "list { \n series { \n _id \n } \n status \n note \n currentEp \n }",
  ],
  header: ["avatar"],
  favor: ["_id", "favoriteList { \n _id \n }"],
  // searchList: [
  //   `series {${VIDEO_QUERIES["search"].join(" \n ")}}`,
  //   "status",
  //   "note",
  //   "currentEp",
  // ],
};
