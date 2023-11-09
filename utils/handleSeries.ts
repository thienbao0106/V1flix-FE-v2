import { findSeriesQuery } from "./../src/queries/series";
import { useQuery } from "@vue/apollo-composable";

export const fetchSeries = (keyword: any, status?: string, genres?: string) => {
  const { onResult, loading } = useQuery(
    findSeriesQuery(
      [
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
      keyword,
      0,
      {
        status: status === "default" ? "" : status,
        genres: genres === "default" ? "" : genres,
      }
    ),
    {},
    {
      fetchPolicy: "no-cache",
    }
  );
  console.log("test");
  return {
    onResult,
    loading,
  };
};
