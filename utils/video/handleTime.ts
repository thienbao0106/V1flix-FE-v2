export const convertToTimestamp = (video: any): string => {
  const seconds = video.currentTime;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const historyTimeline = (
  history: any,
  title: string,
  ep: string
): number => {
  const filteredArray = history.filter((item: any) => {
    return item.title === title && item.currentEp === ep;
  });
  if (filteredArray.length < 1) return 0;
  return filteredArray[1].seconds;
};
