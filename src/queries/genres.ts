import gql from "graphql-tag";

export const getGenres = () => gql`
  query getGenres {
    genres {
      _id
      name
      description
    }
  }
`;
