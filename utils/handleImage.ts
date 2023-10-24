export const defaultImage = (type: string) =>
  `http://res.cloudinary.com/${
    import.meta.env.VITE_CLOUDINARY_IMAGE_ID
  }/image/upload/v1/anime-v2/${type}/default-${type}`;
export const getImageType = (images: any, type: string) => {
  if (type !== "cover" && type !== "thumbnail" && type !== "banner")
    return defaultImage(type);
  if (!images || images.length === 0) return defaultImage(type);
  const result = images.find((image: any) => image.type === type)?.source || "";
  if (result === "") return defaultImage(type);
  return result;
};
