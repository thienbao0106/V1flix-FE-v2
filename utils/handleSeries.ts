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
        "episodes { \n _id \n source \n epNum \n title \n created_at \n view \n }",
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
  return {
    onResult,
    loading,
  };
};
