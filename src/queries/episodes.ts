import gql from "graphql-tag";

export const getEpisodes = () => gql`
  query getEpisodes {
    episodes {
      _id
      epNum
      source
      created_at
      series {
        _id
        title
        images {
          _id
          source
          type
        }
      }
    }
  }
`;