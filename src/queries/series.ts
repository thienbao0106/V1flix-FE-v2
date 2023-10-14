import gql from "graphql-tag";

export const findSeriesQuery = (
  seriesFields: string[],
  keyword: String | any
) => gql`
  query findSeriesByName {
    findSeries(title: "${keyword}") {
        ${[...seriesFields].join("\n")}
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
