const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export const formatDuration = (time: number) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
};

export const handlePercent = (
  width: number,
  currentPercent: number
): string => {
  let finalPercent: number = currentPercent;

  if (width >= 1950) {
    if (finalPercent < 0.05) finalPercent = 0.05;
    if (finalPercent > 0.95) finalPercent = 0.95;
  } else if (width >= 1280 && width < 1950) {
    if (finalPercent < 0.2) finalPercent = 0.2;
    if (finalPercent > 0.84) finalPercent = 0.84;
  } else if (width >= 800 && width < 1280) {
    if (finalPercent < 0.15) finalPercent = 0.15;
    if (finalPercent > 0.9) finalPercent = 0.9;
  } else if (width >= 500 && width < 800) {
    if (finalPercent < 0.2) finalPercent = 0.2;
    if (finalPercent > 0.8) finalPercent = 0.8;
  } else {
    if (finalPercent < 0.2) finalPercent = 0.2;
    if (finalPercent > 0.8) finalPercent = 0.8;
  }
  return finalPercent.toString();
};
