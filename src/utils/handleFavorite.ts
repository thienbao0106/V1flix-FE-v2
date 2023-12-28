import { useMutation } from "@vue/apollo-composable";
import { addFavorite, removeFavorite } from "../queries/series";

export async function addSeriesFavorite(
  seriesId: string,
  userId: string,
  favorNum: number,
  setIsLike?: any,
  setFavorNum?: any
) {
  const { mutate } = useMutation(addFavorite);
  const result = await mutate({
    seriesId,
    userId,
  });
  if (!result) return;
  const { addFavoriteSeries } = result.data;
  if (!addFavoriteSeries) return;
  setIsLike(true);
  setFavorNum(favorNum + 1);
}
export async function removeSeriesFavorite(
  seriesId: string,
  userId: string,
  favorNum: number,
  setIsLike?: any,
  setFavorNum?: any
) {
  const { mutate } = useMutation(removeFavorite);
  const result = await mutate({
    seriesId,
    userId,
  });
  if (!result) return;
  const { deleteFavoriteSeries } = result.data;
  if (!deleteFavoriteSeries) return;
  setIsLike(true);
  setFavorNum(favorNum - 1);
}
