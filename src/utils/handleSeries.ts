import { VIDEO_QUERIES } from "../constants/video";
import { findSeriesByNameQuery, findSeriesQuery } from "../queries/series";
import { useQuery } from "@vue/apollo-composable";
import { defaultImage } from "./handleImage";

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

export const fetchSeriesByName = (
  keyword: any,
  kind: string,
  isRelation?: boolean
) => {
  const { onResult, loading, onError } = useQuery(
    findSeriesByNameQuery(VIDEO_QUERIES[kind], keyword, isRelation),
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

export const formatDuration = (duration: number): string => {
  if (duration < 60) return `${duration} minutes`;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} hours ${minutes} minutes`;
};

export const formatThumbnail = (source: any): string => {
  const ggDriveSource = source.find(
    (src: any) => src.kind === "ggdrive"
  )?.value;
  if (!ggDriveSource) return defaultImage("banner");
  const match = ggDriveSource.match(/\/files\/([^?&]+)/);

  return match
    ? `https://lh3.googleusercontent.com/d/${match[1]}?authuser=0`
    : defaultImage("banner");
};
