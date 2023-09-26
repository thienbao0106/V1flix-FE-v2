import gql from "graphql-tag";

export const findSeriesQuery = (seriesFields: String[], keyword: String) => gql`
  query FindSeriesByName {
    findSeries(title: "${keyword}") {
        ${[...seriesFields]}
    }
  }
`;
