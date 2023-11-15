import { QUERIES } from "../src/constants/video";
import { findSeriesQuery } from "./../src/queries/series";
import { useQuery } from "@vue/apollo-composable";

export const fetchSeries = (
  keyword: any,
  kind: string,
  status?: string,
  genres?: string
) => {
  const { onResult, loading } = useQuery(
    findSeriesQuery(QUERIES[kind], keyword, 0, {
      status: status === "default" ? "" : status,
      genres: genres === "default" ? "" : genres,
    }),
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
