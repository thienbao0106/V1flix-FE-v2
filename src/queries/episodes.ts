import gql from "graphql-tag";

export const getEpisodes = (currentPage: number, limit: number) => gql`
  query getEpisodes {
    episodes(${`pageNumber: ${currentPage}, limitPerPage: ${limit}`}) {
      totalPage
      episodes {
        title
        view
        _id
        epNum
        created_at
        series {
          _id
          title {
            main_title
          }
          images {
            _id
            source
            type
          }
        }
      }
    }
  }
`;
