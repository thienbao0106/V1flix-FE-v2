import gql from "graphql-tag";

type SeriesFilter = {
  status?: String;
  genres?: String;
};

export const findSeriesQuery = (
  seriesFields: string[],
  keyword: String | any,
  numOfLimit: number,
  filters?: SeriesFilter
) => {
  const status = filters?.status || ``;
  const genres = filters?.genres || ``;
  return gql`
  query findSeriesByName {
    findSeries(title: "${keyword}", numOfLimit: ${numOfLimit}, status: "${status}", genresId: "${genres}") {
        ${[...seriesFields].join("\n")}
    }
  }
`;
};

export const seriesBannerQuery = (limit: number) => gql`
  query getBannerSeries {
    series(${`limitPerPage:  ${limit}`}) {
      series {
        _id
        title {
          main_title
          alt_title
        }
        type
        description
        duration
        season
        images {
          _id
          source
          type
        }
      }
    }
  }
`;

export const seriesQuery = (currentPage?: number, limit?: number) => {
  let pageNumber = currentPage || 0;
  let limitPerPage = limit || 0;
  return gql`
  query getSeries {
    series(${`pageNumber: ${pageNumber}, limitPerPage: ${limitPerPage}`}) {
      series {
        _id
        title {
          main_title
          alt_title
        }
        status
        total_episodes
        type
        view
        episodes {
          epNum
        }
        images {
          _id
          source
          type
        }
      }
    }
  }
`;
};

export const listSeriesQuery = (currentPage: number, limit: number) => {
  return gql`
  query getSeries {
    series(${`pageNumber: ${currentPage}, limitPerPage: ${limit}`}) {
      totalPage
      series {
        _id
        title {
          main_title
          alt_title
        }
        status
        total_episodes
        type
        view
        images {
          _id
          source
          type
        }
      }
    }
  }
`;
};

export const randomSeriesQuery = (seriesFields: string[]) => gql`
  query randomSeries {
    randomSeries {
      ${[...seriesFields].join("\n")}
    }
  }
`;

export const addViewMutation = () => gql`
  mutation addView($seriesId: String!, $episodeId: String!) {
    addView(seriesId: $seriesId, episodeId: $episodeId)
  }
`;

export const addFavorite = () => gql`
  mutation addFavoriteSeries($seriesId: String!, $userId: String!) {
    addFavoriteSeries(seriesId: $seriesId, userId: $userId)
  }
`;

export const removeFavorite = () => gql`
  mutation deleteFavoriteSeries($seriesId: String!, $userId: String!) {
    deleteFavoriteSeries(seriesId: $seriesId, userId: $userId)
  }
`;

export const findSeriesByIds = (listSeries: any) => {
  const result = '"' + listSeries.join('","') + '"';

  return gql`
    query findSeriesByIds {
      findSeriesByIds(${`listSeries: [${result}]`}) {
        _id
        title {
          main_title
          alt_title
        }
        status
        total_episodes
        type
        view
        images {
          _id
          source
          type
        }
      }
    }
  `;
};
