export const checkWatchedEpisode = (historyEp: any, episodes: any): any => {
  let result = [];
  for (let ep = 0; ep < episodes.length; ep++) {
    for (let history = 0; history < historyEp.length; history++) {
      if (episodes[ep].epNum === parseInt(historyEp[history].currentEp)) {
        result.push(true);
      }
      result.push(false);
    }
  }
  return result;
};
