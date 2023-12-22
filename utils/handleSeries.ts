import { VIDEO_QUERIES } from "../src/constants/video";
import { findSeriesQuery } from "./../src/queries/series";
import { useQuery } from "@vue/apollo-composable";

export const fetchSeries = (
  keyword: any,
  kind: string,
  status?: string,
  genres?: any
) => {
  const { onResult, loading, onError } = useQuery(
    findSeriesQuery(VIDEO_QUERIES[kind], keyword, 0, {
      status: status === "default" ? "" : status,
      genres: genres === "default" ? "" : genres,
    }),
    {},
    {
      fetchPolicy: "no-cache",
    }
  );

  return {
    onResult,
    loading,
    onError,
  };
};

export const handleHistory = (
  historyList: any,
  currentSeriesId: string,
  currentEp: any,
  title: string,
  seconds?: number
) => {
  const list = historyList;

  list.unshift({
    seriesId: currentSeriesId,
    time: new Date().toLocaleString(),
    currentEp,
    seconds: seconds || 0,
    title,
  });
  return list;
};
