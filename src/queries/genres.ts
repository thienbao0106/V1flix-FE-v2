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

export const getGenresMenu = () => gql`
  query getGenres {
    genres {
      _id
      name
    }
  }
`;

export const findGenres = (genreId: any) => gql`
  query getGenres {
    findGenresById(genreId:  "${genreId}") {
      _id
      name 
      series {
        _id
        images {
          _id
          name
          type 
          source
        }
        title {
          main_title
          alt_title
        }
        total_episodes
        created_at
        status
      }
    }
  }
`;
