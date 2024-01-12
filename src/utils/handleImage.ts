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

export const uploadToCloudinary = async (imgFile: any) => {
  const unsignedUploadPreset = import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD;
  const cloudName = import.meta.env.VITE_CLOUDINARY_IMAGE_ID;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const fd = new FormData();
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("file", imgFile);
  fd.append("folder", "anime-v2/avatar");
  const finalUrl = await fetch(url, {
    method: "POST",
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      // File uploaded successfully

      return data.secure_url;
    })
    .catch((error) => {
      console.error("Error uploading the file:", error);
    });
  return finalUrl;
};
