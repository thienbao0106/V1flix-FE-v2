export const totalCurrentEpisode = (user: any): number => {
  return Object.keys(user).length > 0 && user.list.length > 0
    ? user.list
        .map((item: any) => item.currentEp)
        .reduce((total: number, current: number) => total + current)
    : 0;
};
