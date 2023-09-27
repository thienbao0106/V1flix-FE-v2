import gql from "graphql-tag";

export const findSeriesQuery = (seriesFields: String[], keyword: String) => gql`
  query FindSeriesByName {
    findSeries(title: "${keyword}") {
        ${[...seriesFields]}
    }
  }
`;

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
        images {
          _id
          source
          type
        }
      }
    }
  }
`;
