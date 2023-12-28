export const isIOS = () => {
  console.log(navigator.userAgent);
  return (
    ["iPad", "iPhone", "iPod"].includes(navigator.userAgent) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};
