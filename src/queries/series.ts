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
    series(${limit && `amount: ${limit}`}) {
      series {
        _id
        title
        description
        images {
          _id
          source
          type
        }
      }
    }
  }
`;

export const seriesQuery = (limit: number) => gql`
  query getSeries {
    series(${limit && `amount: ${limit}`}) {
      series {
        _id
        title
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

export const randomSeriesQuery = () => gql`
  query randomSeries {
    randomSeries {
      _id
      title
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

export const addViewMutation = () => gql`
  mutation addView($seriesId: String!, $episodeId: String!) {
    addView(seriesId: $seriesId, episodeId: $episodeId)
  }
`;
