import { useHead } from "@unhead/vue";
import { defaultImage } from "./handleImage";

// `${this.getInfoUrl.title}`
export const setMetadata = (
  image: any,
  title: any,
  description: string,
  ep?: any
) => {
  useHead({
    title: title,
    meta: [
      {
        property: "og:image",
        content: image || defaultImage,
      },
      {
        property: "og:title",
        content: `${title} ${ep ? `- Ep: ${ep}` : ""}`,
      },
      {
        property: "og:url",
        content: window.location.href,
      },
      {
        property: "og:description",
        content: description,
      },
    ],
  });
};
